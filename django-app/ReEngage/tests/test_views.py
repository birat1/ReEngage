from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User
from ReEngage.models import Admin, Student

class StudentAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Admin', surname='User')
        self.student_user = User.objects.create_user(username='student', password='pass')
        self.student = Student.objects.create(user=self.student_user, firstname='Stu', surname='Dent', year=3, managed_by=self.admin)

    def test_get_students(self):
        response = self.client.get('/api/students/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('Stu', response.content.decode()) 