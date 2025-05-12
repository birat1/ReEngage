from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin

class SimpleE2ETest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Bob', surname='Builder')

    def test_login_and_access_protected(self):
        response = self.client.get('/api/get-students/')
        
        self.assertIn(response.status_code, [401, 403])
        # Login
        self.client.login(username='admin', password='pass')
        response = self.client.get('/api/get-students/')
        self.assertNotEqual(response.status_code, 401)


        # Need to Test what happens if wrong credentials are used
    def test_wrong_credentials(self):
        login_success = self.client.login(username='admin', password='wrongpass')
        self.assertFalse(login_success)

        response = self.client.get('/api/get-students/')
        print('E2E after wrong login response:', response.status_code) 
        self.assertIn(response.status_code, [401, 403]) 