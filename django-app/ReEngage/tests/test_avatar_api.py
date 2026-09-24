from django.test import Client, TestCase

from ReEngage.models import Avatar


class AvatarAPITest(TestCase):
    def setUp(self) -> None:
        self.client = Client()
        self.avatar = Avatar.objects.create(name="TestAvatar", price=100)

    def test_list_avatars(self) -> None:
        response = self.client.get("/api/avatar/")
        assert response.status_code == 200
        assert "TestAvatar" in response.content.decode()

    def test_retrieve_avatar(self) -> None:
        response = self.client.get(f"/api/avatar/{self.avatar.avatar_id}/")
        assert response.status_code == 200
        assert "TestAvatar" in response.content.decode()
