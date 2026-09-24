from django.contrib.auth.models import User
from django.test import Client, TestCase

from ReEngage.models import Admin, Student


class StudentAPITest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.admin_user = User.objects.create_user(username="admin", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Admin", surname="User")
        self.student_user = User.objects.create_user(username="student", password="pass")
        self.student = Student.objects.create(user=self.student_user, firstname="Stu", surname="Dent", year=3, managed_by=self.admin)

    def test_get_students(self) -> None:
        response = self.client.get("/api/students/")
        assert response.status_code == 200
        assert "Stu" in response.content.decode()
