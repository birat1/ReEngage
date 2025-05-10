from django.test import TestCase, Client
from ReEngage.models import Avatar

class AvatarAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.avatar = Avatar.objects.create(name='TestAvatar', price=100)

    def test_list_avatars(self):
        response = self.client.get('/api/avatar/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('TestAvatar', response.content.decode())

    def test_retrieve_avatar(self):
        response = self.client.get(f'/api/avatar/{self.avatar.avatar_id}/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('TestAvatar', response.content.decode()) 