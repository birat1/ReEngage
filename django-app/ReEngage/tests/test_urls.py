from django.test import SimpleTestCase
from django.urls import resolve, reverse

from ReEngage import views


class URLResolutionTest(SimpleTestCase):
    def test_students_url_resolves(self) -> None:
        url = reverse("students")
        assert resolve(url).func.__name__ == views.apiStudent.as_view({"get": "list"}).__name__

    def test_login_url_resolves(self) -> None:
        url = reverse("login_user")
        assert resolve(url).func == views.login_user

    def test_logout_url_resolves(self) -> None:
        url = reverse("logout_user")
        assert resolve(url).func == views.logout_user
