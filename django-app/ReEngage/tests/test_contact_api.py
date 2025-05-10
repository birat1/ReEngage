from django.test import TestCase, Client
from ReEngage.models import ContactMessage

class ContactMessageAPITest(TestCase):
    def setUp(self):
        self.client = Client()

    def test_submit_contact_message(self):
        data = {
            'name': 'Test User',
            'email': 'test@example.com',
            'message': 'This is a test message.'
        }
        response = self.client.post('/api/contact/', data)
        print('Contact POST response:', response.status_code)  # Debug print
        # print(response.content)  # Uncomment if you want to see the response
        self.assertEqual(response.status_code, 201)
        self.assertTrue(ContactMessage.objects.filter(email='test@example.com').exists())
        # TODO: Test for invalid email or missing fields 