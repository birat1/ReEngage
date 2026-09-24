import requests
from django.conf import settings

BASE_URL = "https://open-api.thenational.academy/api/v0"


def fetch_from_oak_api(endpoint, params=None) -> dict | None:
    headers = {"Authorization": f"Bearer {settings.API_OAK_KEY}"}

    try:
        response = requests.get(f"{BASE_URL}/{endpoint}", headers=headers, params=params)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error fetching from Oak OpenAPI: {e}")
        return None


def get_units(keystage: str, subject: str, year: int) -> list:
    endpoint = f"key-stages/{keystage}/subject/{subject}/units"

    data = fetch_from_oak_api(endpoint)
    if not data:
        return []

    expected_year = f"year-{year}"
    year_data = next((entry for entry in data if entry["yearSlug"] == expected_year), None)

    return year_data["units"] if year_data else []


def get_lessons(keystage: str, subject: str, unit: str) -> list:
    endpoint = f"key-stages/{keystage}/subject/{subject}/lessons?unit={unit}&offset=0&limit=100"

    return fetch_from_oak_api(endpoint)


def get_lesson_asset(lesson: str, asset_type: str) -> requests.Response:
    endpoint = f"lessons/{lesson}/assets/{asset_type}"

    headers = {"Authorization": f"Bearer {settings.API_OAK_KEY}"}
    response = requests.get(f"{BASE_URL}/{endpoint}", headers=headers, stream=True)

    return response


def get_lesson_summary(lesson: str) -> dict | None:
    endpoint = f"lessons/{lesson}/summary"

    return fetch_from_oak_api(endpoint)


def get_questions(keystage: str, subject: str) -> list:
    endpoint = f"key-stages/{keystage}/subject/{subject}/questions"

    return fetch_from_oak_api(endpoint)
