from django.test import TestCase, Client
from ReEngage.models import ContactMessage

class ContactMessageAPITest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_submit_contact_message(self):
        data = {
            'name': 'Test User',
            'email': 'testuser@email.com',
            'message': 'This is a test message.'
        }
        response = self.client.post('/api/contact/', data)

        self.assertEqual(response.status_code, 201)
        self.assertTrue(ContactMessage.objects.filter(email='testuser@email.com').exists())