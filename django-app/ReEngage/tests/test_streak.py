from datetime import datetime, timedelta

from django.contrib.auth.models import User
from django.test import TestCase

from ReEngage.models import Admin, Student
from ReEngage.views import update_login_streak


class StreakTestCase(TestCase):
    def setUp(self) -> None:
        self.admin_user = User.objects.create_user(username="admin_user", password="password123", email="admin@email.com")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Admin", surname="User", is_admin=True)
        self.student_user = User.objects.create_user(username="student_user", password="password123", email="student@email.com")
        self.student = Student.objects.create(
            user=self.student_user,
            firstname="Student",
            surname="User",
            year=3,
            managed_by=self.admin,
            level=1,
            xp=0,
            points=0,
            streak=0,
            last_streak_check=None,
        )

    def test_first_login_streak(self) -> None:
        result = update_login_streak(self.student_user)
        self.student.refresh_from_db()
        assert self.student.streak == 1
        assert result == 1
        assert self.student.last_streak_check == datetime.now().date()

    def test_same_day_login_streak(self) -> None:
        update_login_streak(self.student_user)
        self.student.refresh_from_db()
        initial_streak = self.student.streak
        result = update_login_streak(self.student_user)
        self.student.refresh_from_db()
        assert self.student.streak == initial_streak
        assert result == initial_streak

    def test_consecutive_day_login_streak(self) -> None:
        update_login_streak(self.student_user)
        yesterday = datetime.now().date() - timedelta(days=1)
        self.student.last_streak_check = yesterday
        self.student.save()
        result = update_login_streak(self.student_user)
        self.student.refresh_from_db()
        assert self.student.streak == 2
        assert result == 2
        assert self.student.last_streak_check == datetime.now().date()

    def test_non_consecutive_day_login_streak(self) -> None:
        update_login_streak(self.student_user)
        self.student.streak = 5
        two_days_ago = datetime.now().date() - timedelta(days=2)
        self.student.last_streak_check = two_days_ago
        self.student.save()
        result = update_login_streak(self.student_user)
        self.student.refresh_from_db()
        assert self.student.streak == 1
        assert result == 1
        assert self.student.last_streak_check == datetime.now().date()
