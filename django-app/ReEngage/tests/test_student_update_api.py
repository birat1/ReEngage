from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin, Student
import json

class StudentUpdateAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Admin', surname='User')
        self.student_user = User.objects.create_user(username='student', password='pass')
        self.student = Student.objects.create(user=self.student_user, firstname='Stu', surname='Dent', year=3, managed_by=self.admin)

    def test_update_student(self):
        self.client.login(username='admin', password='pass')
        data = {'firstname': 'Updated', 'surname': 'Name'}
        response = self.client.put(f'/api/students/{self.student.pk}/edit/', data=json.dumps(data), content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.student.refresh_from_db()
        self.assertEqual(self.student.firstname, 'Updated')
        self.assertEqual(self.student.surname, 'Name') 