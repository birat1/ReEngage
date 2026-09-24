from ReEngage.models import Avatar


def seedAvatar() -> None:
    avatars = [
        {"name": "Default", "price": 0},
        {"name": "One", "price": 200},
        {"name": "Two", "price": 300},
        {"name": "Three", "price": 400},
        {"name": "Four", "price": 500},
        {"name": "Five", "price": 600},
        {"name": "Six", "price": 700},
        {"name": "Seven", "price": 800},
        {"name": "Eight", "price": 900},
        {"name": "Nine", "price": 1000},
        {"name": "Ten", "price": 1100},
        {"name": "Eleven", "price": 1200},
        {"name": "Twelve", "price": 1300},
        {"name": "Thirteen", "price": 1400},
        {"name": "Fourteen", "price": 1500},
        {"name": "Fifteen", "price": 1600},
        {"name": "Sixteen", "price": 1700},
    ]

    # Seed 6 avatars
    for a in avatars:
        if not Avatar.objects.filter(name=a["name"]).exists():
            Avatar.objects.create(**a)
            print(f"Avatar {a['name']} created.")
        else:
            print(f"Avatar {a['name']} already exists.")
