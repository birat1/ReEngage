from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin

class SimpleE2ETest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Bob', surname='Builder')

    def test_login_and_access_protected(self):
        # Try to access protected endpoint without login
        response = self.client.get('/api/get-students/')
        print('E2E pre-login response:', response.status_code) 
        self.assertIn(response.status_code, [401, 403])
        # Login
        self.client.login(username='admin', password='pass')
        # Now access again
        response = self.client.get('/api/get-students/')
        self.assertNotEqual(response.status_code, 401)


        # Need to Test what happens if wrong credentials are used
    def test_wrong_credentials(self):
        # Try to login with wrong password
        login_success = self.client.login(username='admin', password='wrongpass')
        print('Login with wrong password success:', login_success)  # Debug print
        self.assertFalse(login_success)
        # Try to access protected endpoint after failed login
        response = self.client.get('/api/get-students/')
        print('E2E after wrong login response:', response.status_code) 
        self.assertIn(response.status_code, [401, 403]) 