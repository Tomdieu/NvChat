from django.urls import re_path, path
from . import consumers


websocket_urpatterns = [
    re_path(
        r"ws/notifications/(?P<user_id>[0-9]+)/$",
        consumers.UserNotificationConsumer.as_asgi(),
    )
]
