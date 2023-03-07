"""
ASGI config for backend project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import URLRouter, ProtocolTypeRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

from chat.middleware import TokenAuthMiddleWare

import chat.routing
import account.routing

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        # Just HTTP for now. (We can add other protocols later.)
        "websocket": AllowedHostsOriginValidator(
            AuthMiddlewareStack(
                TokenAuthMiddleWare(
                    URLRouter(
                        chat.routing.websocket_urlpatterns
                        + account.routing.websocket_urlpatterns
                    )
                )
            )
        ),
    }
)
