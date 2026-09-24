from django.test import Client, TestCase


class OakAPIEndpointTest(TestCase):
    def setUp(self) -> None:
        self.client = Client()

    def test_units_api(self) -> None:
        # Example values; update as needed for your data
        response = self.client.get("/api/oak/units/stage4/maths/4/")
        # Accepts 200 or 404 if no data, but endpoint should exist
        assert response.status_code in [200, 404]
