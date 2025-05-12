from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin

class IntegrationTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Jonny', surname='Walker')

    def test_login_and_get_user_info(self):
        # Login
        response = self.client.post('/api/login/', data={'username': 'admin', 'password': 'pass'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        
        response = self.client.get('/api/current-user-info/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('admin', response.content.decode()) 