from django.contrib.auth.models import User
from django.test import Client, TestCase

from ReEngage.models import Admin, Student


class AdminPermissionsTest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.admin_user = User.objects.create_user(username="admin", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Jamal", surname="Ajam")
        self.student_user = User.objects.create_user(username="jam_al", password="ajam")
        self.student = Student.objects.create(user=self.student_user, firstname="Student", surname="LastName", year=3, managed_by=self.admin)

    def test_admin_access_get_students(self) -> None:
        self.client.login(username="admin", password="pass")
        response = self.client.get("/api/get-students/")
        assert response.status_code == 200

    def test_student_cannot_access_get_students(self) -> None:
        self.client.login(username="student", password="pass")
        response = self.client.get("/api/get-students/")
        assert response.status_code in [401, 403]
