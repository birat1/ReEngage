from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin

class PermissionsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Admin', surname='User')

    def test_get_students_requires_auth(self):
        # Should be unauthorized if not logged in
        response = self.client.get('/api/get-students/')
    
        self.assertIn(response.status_code, [401, 403])

        # Login and try again
        self.client.login(username='admin', password='pass')
        response = self.client.get('/api/get-students/')
        # Should be allowed (200 or 403 if no students)
        self.assertNotEqual(response.status_code, 401)

        # Should test with a user who is not an admin (using student account)