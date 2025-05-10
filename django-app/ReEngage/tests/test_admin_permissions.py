from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin, Student

class AdminPermissionsTest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Jamal', surname='Ajam')
        self.student_user = User.objects.create_user(username='jam_al', password='ajam')
        self.student = Student.objects.create(user=self.student_user, firstname='Student', surname='LastName', year=3, managed_by=self.admin)

    def test_admin_can_access_get_students(self):
        self.client.login(username='admin', password='pass')
        response = self.client.get('/api/get-students/')
        print('Admin GET students response:', response.status_code)  # Debug print
        self.assertEqual(response.status_code, 200)
        # TODO: Check the actual data returned, not just status code

    def test_student_cannot_access_get_students(self):
        self.client.login(username='student', password='pass')
        response = self.client.get('/api/get-students/')
        # print(response.content)  # Sometimes useful for debugging
        self.assertIn(response.status_code, [401, 403])
        # TODO: Maybe test what error message is returned? 