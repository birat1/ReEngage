from django.test import TestCase, Client
from django.contrib.auth.models import User
from ReEngage.models import Admin, Student
import json
from datetime import datetime, timedelta

class AuthenticationAPITest(TestCase):
    def setUp(self):
        self.client = Client()
        self.admin_user = User.objects.create_user(username='admin_user', password='password123', email='admin@example.com')
        self.admin = Admin.objects.create(user=self.admin_user, firstname='Admin', surname='User', is_admin=True)
        self.student_user = User.objects.create_user(username='student_user', password='password123', email='student@example.com')
        self.student = Student.objects.create(user=self.student_user, firstname='Abdul', surname='Sheikh', year=3, managed_by=self.admin, level=1, xp=0, points=0, streak=0, last_streak_check=None)

    def test_login_success(self):
        response = self.client.post(
            '/api/login/',
            json.dumps({'username': 'student_user', 'password': 'password123'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['message'], 'Login successful')
        self.assertEqual(data['username'], 'student_user')
        self.assertEqual(data['is_admin'], False)
        self.assertEqual(data['user_id'], self.student_user.id)
        self.assertIn('sessionid', data)

    def test_login_invalid_credentials(self):
        response = self.client.post(
            '/api/login/',
            json.dumps({'username': 'student_user', 'password': 'wrong_password'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertEqual(data['error'], 'Invalid username or password')

    def test_login_invalid_json(self):
        response = self.client.post(
            '/api/login/',
            'invalid json data',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertEqual(data['error'], 'Invalid JSON')

    def test_login_streak_update(self):
        # First login
        response = self.client.post(
            '/api/login/',
            json.dumps({'username': 'student_user', 'password': 'password123'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        self.student.refresh_from_db()
        self.assertEqual(self.student.streak, 1)
        self.assertEqual(self.student.last_streak_check, datetime.now().date())
        self.client.post('/api/logout/')
       
        yesterday = datetime.now().date() - timedelta(days=1)
        self.student.last_streak_check = yesterday
        self.student.save()

        response = self.client.post(
            '/api/login/',
            json.dumps({'username': 'student_user', 'password': 'password123'}),
            content_type='application/json'
        )
        self.student.refresh_from_db()
        self.assertEqual(self.student.streak, 2)

    def test_admin_login(self):
        response = self.client.post(
            '/api/login/',
            json.dumps({'username': 'admin_user', 'password': 'password123'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertEqual(data['is_admin'], True)

    def test_login_method_not_allowed(self):
        response = self.client.get('/api/login/')
        self.assertEqual(response.status_code, 405)
        data = json.loads(response.content)
        self.assertEqual(data['error'], 'Invalid request method')

 