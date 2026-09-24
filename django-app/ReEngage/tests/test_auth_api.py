import json
from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.test import Client, TestCase

from ReEngage.models import Admin, Student


class AuthenticationAPITest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.admin_user = User.objects.create_user(username="admin_user", password="password123", email="admin@example.com")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Admin", surname="User", is_admin=True)
        self.student_user = User.objects.create_user(username="student_user", password="password123", email="student@example.com")
        self.student = Student.objects.create(
            user=self.student_user,
            firstname="Abdul",
            surname="Sheikh",
            year=3,
            managed_by=self.admin,
            level=1,
            xp=0,
            points=0,
            streak=0,
            last_streak_check=None,
        )

    def test_login_success(self) -> None:
        response = self.client.post("/api/login/", json.dumps({"username": "student_user", "password": "password123"}), content_type="application/json")
        assert response.status_code == 200
        data = json.loads(response.content)
        assert data["message"] == "Login successful"
        assert data["username"] == "student_user"
        assert not data["is_admin"]
        assert data["user_id"] == self.student_user.id
        assert "sessionid" in data

    def test_login_invalid_credentials(self) -> None:
        response = self.client.post("/api/login/", json.dumps({"username": "student_user", "password": "wrong_password"}), content_type="application/json")
        assert response.status_code == 400
        data = json.loads(response.content)
        assert data["error"] == "Invalid username or password"

    def test_login_invalid_json(self) -> None:
        response = self.client.post("/api/login/", "invalid json data", content_type="application/json")
        assert response.status_code == 400
        data = json.loads(response.content)
        assert data["error"] == "Invalid JSON"

    def test_login_streak_update(self) -> None:
        # First login
        response = self.client.post("/api/login/", json.dumps({"username": "student_user", "password": "password123"}), content_type="application/json")
        assert response.status_code == 200
        self.student.refresh_from_db()
        assert self.student.streak == 1
        assert self.student.last_streak_check == datetime.now().date()
        self.client.post("/api/logout/")

        yesterday = datetime.now().date() - timedelta(days=1)
        self.student.last_streak_check = yesterday
        self.student.save()

        response = self.client.post("/api/login/", json.dumps({"username": "student_user", "password": "password123"}), content_type="application/json")
        self.student.refresh_from_db()
        assert self.student.streak == 2

    def test_admin_login(self) -> None:
        response = self.client.post("/api/login/", json.dumps({"username": "admin_user", "password": "password123"}), content_type="application/json")
        assert response.status_code == 200
        data = json.loads(response.content)
        assert data["is_admin"] == True

    def test_login_method_not_allowed(self) -> None:
        response = self.client.get("/api/login/")
        assert response.status_code == 405
        data = json.loads(response.content)
        assert data["error"] == "Invalid request method"
