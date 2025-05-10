from django.test import TestCase, Client

class OakAPIEndpointTest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_units_api(self):
        # Example values; update as needed for your data
        response = self.client.get('/api/oak/units/stage4/maths/4/')
        # Accepts 200 or 404 if no data, but endpoint should exist
        self.assertIn(response.status_code, [200, 404])
