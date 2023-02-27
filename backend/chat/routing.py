from django.urls import re_path, path
from . import consumers


websocket_urpatterns = [
    # re_path(r'ws/notifications/(?P<pk>[0-9]+)/$', consumers.UserNotificationConsumer.as_asgi()),
    re_path(
        r"ws/group_chat/(?P<group_chat_id>[0-9]+)/$",
        consumers.GroupChatConsumer.as_asgi(),
    ),
    re_path(
        r"ws/discussion_chat/(?P<conversation_id>[0-9]+)/$",
        consumers.ConversationConsumer.as_asgi(),
    ),
]
