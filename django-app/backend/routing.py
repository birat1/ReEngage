import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator
from django.urls import path, include, re_path
from ReEngage.consumers import AnimalFactConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter([
                re_path(r"^ws/animalfact/$", AnimalFactConsumer.as_asgi()),
            ])
        )
    ),
})


websocket_urlpatterns = [
    re_path(r"^ws/animalfact/$", AnimalFactConsumer.as_asgi()),
]
