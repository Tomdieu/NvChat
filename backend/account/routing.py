from django.urls import re_path
from .consumers import UserConsumer

websocket_urlpatterns = [
    re_path(r"ws/notification/(?P<user_id>[0-9]+)/$", UserConsumer.as_asgi())
]
