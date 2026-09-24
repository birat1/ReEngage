import asyncio
import contextlib
import json
import random
import time

import aiohttp
from backend.settings import API_NINJAS_KEY
from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.core.cache import cache


class AnimalFactConsumer(AsyncWebsocketConsumer):
    ANIMALS = [
        "cheetah",
        "White Tiger",
        "African Forest Elephant",
        "zebra",
        "Pygmy Hippopotamus",
        "Indian Rhinoceros",
        "Eastern Gorilla",
        "chimpanzee",
        "koala",
        "panda",
        "Arctic Wolf",
        "fox",
        "bear",
        "penguin",
        "Bottlenose Dolphin",
        "Blue Whale",
        "shark",
        "owl",
        "falcon",
        "crocodile",
        "alligator",
        "River Turtle",
        "Burrowing Frog",
        "toad",
        "Tiger Salamander",
        "Vampire Bat",
        "deer",
        "moose",
        "buffalo",
        "camel",
        "llama",
        "sloth",
        "armadillo",
        "platypus",
        "flamingo",
        "American Bulldog",
        "Guinea Pig",
        "Cow",
    ]

    GROUP_NAME = "animal_fact_group"
    UPDATE_INTERVAL = 300  # change timer here
    _timer_task = None
    _connection_count = 0

    async def connect(self) -> None:
        await self.channel_layer.group_add(self.GROUP_NAME, self.channel_name)
        await self.accept()
        type(self)._connection_count += 1

        await self.start_background_task()

        await self.send_current_fact()

    async def start_background_task(self) -> None:
        timer_task = type(self)._timer_task
        if timer_task and not timer_task.done():
            return

        state = await self.get_or_create_shared_state()
        state["task_started"] = True
        await database_sync_to_async(cache.set)("animal_fact_state", state)
        type(self)._timer_task = asyncio.create_task(self.global_timer_loop())

    # global timer that updates facts on its own
    async def global_timer_loop(self) -> None:
        while True:
            try:
                state = await self.get_or_create_shared_state()
                elapsed = time.time() - state["last_update"]
                remaining = max(0, state["update_interval"] - elapsed)

                if remaining <= 0:
                    await self.update_fact()
                await asyncio.sleep(1)

            except Exception as e:
                print(f"Timer error: {e}")
                await asyncio.sleep(5)

    # fetch new fact and show/broadcast the new fact to all clients
    async def update_fact(self) -> None:
        state = await self.get_or_create_shared_state()

        # get the next animal
        if not state["remaining_animals"]:
            state["remaining_animals"] = random.sample(self.ANIMALS, len(self.ANIMALS))
        animal_name = state["remaining_animals"].pop()

        # fetch the fact
        new_fact = await self.fetch_animal_fact(animal_name) or {"name": animal_name, "characteristics": {"slogan": "Fact unavailable"}}

        # update the state
        state["current_fact"] = new_fact
        state["last_update"] = time.time()
        await database_sync_to_async(cache.set)("animal_fact_state", state)

        await self.channel_layer.group_send(self.GROUP_NAME, {"type": "broadcast.fact", "fact": new_fact, "time_left": self.UPDATE_INTERVAL})

    # sending the new fact to client
    async def broadcast_fact(self, event) -> None:
        try:
            await self.send(text_data=json.dumps({"type": "new_fact", "animal": event["fact"], "time_left": event["time_left"]}))
        except Exception as e:
            print(f"Broadcast error: {e}")
            # auto-reconnecting for the client
            await self.disconnect(1001)

    # send current fact to a newly connected client
    async def send_current_fact(self) -> None:
        state = await self.get_or_create_shared_state()
        elapsed = time.time() - state["last_update"]
        time_left = max(0, self.UPDATE_INTERVAL - elapsed)

        await self.send(text_data=json.dumps({"type": "current_fact", "animal": state["current_fact"], "time_left": time_left}))

    # fetching the fact from the API
    async def fetch_animal_fact(self, animal_name) -> dict | None:
        try:
            async with aiohttp.ClientSession() as session:
                url = f"https://api.api-ninjas.com/v1/animals?name={animal_name}"
                headers = {"X-Api-Key": API_NINJAS_KEY}
                async with session.get(url, headers=headers, timeout=10) as response:
                    if response.status == 200:
                        data = await response.json()
                        return data[0] if data else None
        except Exception as e:
            print(f"API Error: {e}")
            return None

        # initalising (if new connection) or getting current state from redis

    async def get_or_create_shared_state(self) -> dict:
        state = await database_sync_to_async(cache.get)("animal_fact_state")

        if not state:
            animals = random.sample(self.ANIMALS, len(self.ANIMALS))
            first_animal = animals.pop()
            fact = await self.fetch_animal_fact(first_animal) or {"name": first_animal, "characteristics": {"slogan": "Fact unavailable"}}

            state = {
                "remaining_animals": animals,
                "current_fact": fact,
                "last_update": time.time(),
                "update_interval": self.UPDATE_INTERVAL,
                "task_started": False,
            }
            await database_sync_to_async(cache.set)("animal_fact_state", state, timeout=None)

        return state

    async def receive(self, text_data) -> None:
        try:
            data = json.loads(text_data)

            if data.get("type") == "request_update" or data.get("type") == "request_fact":
                await self.send_current_fact()

        except json.JSONDecodeError:
            pass

    async def disconnect(self, close_code) -> None:
        await self.channel_layer.group_discard(self.GROUP_NAME, self.channel_name)

        consumer_type = type(self)
        consumer_type._connection_count = max(0, consumer_type._connection_count - 1)
        if consumer_type._connection_count == 0:
            timer_task = consumer_type._timer_task
            consumer_type._timer_task = None
            if timer_task and not timer_task.done():
                timer_task.cancel()
                with contextlib.suppress(asyncio.CancelledError):
                    await timer_task
