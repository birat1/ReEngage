from django.contrib.auth.models import User
from django.test import TestCase

from ReEngage.models import Admin, Student
from ReEngage.serializers import StudentSerializer


class StudentSerializerTest(TestCase):
    def setUp(self) -> None:
        self.admin_user = User.objects.create_user(username="admin", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Admin", surname="User")
        self.student_user = User.objects.create_user(username="student", password="pass")
        self.student = Student.objects.create(user=self.student_user, firstname="Stu", surname="Dent", year=3, managed_by=self.admin)

    def test_student_serialization(self) -> None:
        serializer = StudentSerializer(self.student)
        data = serializer.data
        assert data["firstname"] == "Stu"
        assert data["surname"] == "Dent"
        assert data["year"] == 3
        assert data["managed_by"] == self.admin.pk
