import json

from django.contrib.auth.models import User
from django.test import Client, TestCase

from ReEngage.models import Admin, Student


class StudentUpdateAPITest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.admin_user = User.objects.create_user(username="admin", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Admin", surname="User")
        self.student_user = User.objects.create_user(username="student", password="pass")
        self.student = Student.objects.create(user=self.student_user, firstname="Stu", surname="Dent", year=3, managed_by=self.admin)

    def test_update_student(self) -> None:
        self.client.login(username="admin", password="pass")
        data = {"firstname": "Updated", "surname": "Name"}
        response = self.client.put(f"/api/students/{self.student.pk}/edit/", data=json.dumps(data), content_type="application/json")
        assert response.status_code == 200
        self.student.refresh_from_db()
        assert self.student.firstname == "Updated"
        assert self.student.surname == "Name"
