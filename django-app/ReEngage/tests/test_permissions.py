from django.contrib.auth.models import User
from django.test import Client, TestCase

from ReEngage.models import Admin


class PermissionsTest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.admin_user = User.objects.create_user(username="admin", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Admin", surname="User")

    def test_get_students_requires_auth(self) -> None:
        # Should be unauthorized if not logged in
        response = self.client.get("/api/get-students/")

        assert response.status_code in [401, 403]

        # Login and try again
        self.client.login(username="admin", password="pass")
        response = self.client.get("/api/get-students/")
        # Should be allowed (200 or 403 if no students)
        assert response.status_code != 401

        # Should test with a user who is not an admin (using student account)
