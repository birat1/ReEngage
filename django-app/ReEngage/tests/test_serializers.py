from django.test import TestCase
from django.contrib.auth.models import User
from ReEngage.models import Student, Admin
from ReEngage.serializers import StudentSerializer

class StudentSerializerTest(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(username='admin', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Admin', surname='User')
        self.student_user = User.objects.create_user(username='student', password='pass')
        self.student = Student.objects.create(user=self.student_user, firstname='Stu', surname='Dent', year=3, managed_by=self.admin)

    def test_student_serialization(self):
        serializer = StudentSerializer(self.student)
        data = serializer.data
        self.assertEqual(data['firstname'], 'Stu')
        self.assertEqual(data['surname'], 'Dent')
        self.assertEqual(data['year'], 3)
        self.assertEqual(data['managed_by'], self.admin.pk) 