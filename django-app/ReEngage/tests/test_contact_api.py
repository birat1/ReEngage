from django.test import Client, TestCase

from ReEngage.models import ContactMessage


class ContactMessageAPITest(TestCase):
    def setUp(self) -> None:
        self.client = Client()

    def test_submit_contact_message(self) -> None:
        data = {"name": "Test User", "email": "testuser@email.com", "message": "This is a test message."}
        response = self.client.post("/api/contact/", data)

        assert response.status_code == 201
        assert ContactMessage.objects.filter(email="testuser@email.com").exists()
