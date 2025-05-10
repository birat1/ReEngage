from django.test import TestCase
from django.contrib.auth.models import User
from ReEngage.models import Admin, Student
from django.db import IntegrityError, transaction

class StudentModelTest(TestCase):
    def setUp(self):
        self.admin_user = User.objects.create_user(username='admin1', password='pass')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Alice', surname='Smith')
        self.student_user = User.objects.create_user(username='student1', password='pass')

    def test_create_student_defaults(self):
        student = Student.objects.create(
            user=self.student_user,
            firstname='Bob',
            surname='Jones',
            year=3,
            managed_by=self.admin
        )
        self.assertEqual(student.level, 0)
        self.assertEqual(student.xp, 0)
        self.assertEqual(student.points, 0)
        self.assertEqual(student.is_admin, False)
        self.assertEqual(student.managed_by, self.admin)

    def test_student_requires_admin_manager(self):
        # Should fail, as managed_by is required
        with self.assertRaises(IntegrityError):
            with transaction.atomic():
                Student.objects.create(
                    user=User.objects.create_user(username='student2', password='pass'),
                    firstname='Eve',
                    surname='Doe',
                    year=4,
                    managed_by=None
                )
        # Should succeed with an Admin
        student = Student.objects.create(
            user=User.objects.create_user(username='student3', password='pass'),
            firstname='Sam',
            surname='Lee',
            year=5,
            managed_by=self.admin
        )
        self.assertEqual(student.managed_by, self.admin) 