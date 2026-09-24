from django.contrib.auth.models import User
from django.test import Client, TestCase

from ReEngage.models import Admin


class SimpleE2ETest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.admin_user = User.objects.create_user(username="admin", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Bob", surname="Builder")

    def test_login_and_access_protected(self) -> None:
        response = self.client.get("/api/get-students/")

        assert response.status_code in [401, 403]
        # Login
        self.client.login(username="admin", password="pass")
        response = self.client.get("/api/get-students/")
        assert response.status_code != 401

        # Need to Test what happens if wrong credentials are used

    def test_wrong_credentials(self) -> None:
        login_success = self.client.login(username="admin", password="wrongpass")
        assert not login_success

        response = self.client.get("/api/get-students/")
        print("E2E after wrong login response:", response.status_code)
        assert response.status_code in [401, 403]
