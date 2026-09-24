import pytest
from django.contrib.auth.models import User
from django.db import IntegrityError, transaction
from django.test import TestCase

from ReEngage.models import Admin, Student


class StudentModelTest(TestCase):
    def setUp(self) -> None:
        self.admin_user = User.objects.create_user(username="admin1", password="pass")
        self.admin = Admin.objects.create(user=self.admin_user, firstname="Alice", surname="Smith")
        self.student_user = User.objects.create_user(username="student1", password="pass")

    def test_create_student_defaults(self) -> None:
        student = Student.objects.create(user=self.student_user, firstname="Bob", surname="Jones", year=3, managed_by=self.admin)
        assert student.level == 0
        assert student.xp == 0
        assert student.points == 0
        assert not student.is_admin
        assert student.managed_by == self.admin

    def test_student_requires_admin_manager(self) -> None:
        with pytest.raises(IntegrityError), transaction.atomic():
            Student.objects.create(
                user=User.objects.create_user(username="student2", password="pass"), firstname="John", surname="Doe", year=4, managed_by=None
            )

        student = Student.objects.create(
            user=User.objects.create_user(username="student3", password="pass"), firstname="William", surname="Lee", year=5, managed_by=self.admin
        )
        assert student.managed_by == self.admin
