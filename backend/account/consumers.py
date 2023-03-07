from channels.generic.websocket import (
    AsyncWebsocketConsumer,
    AsyncJsonWebsocketConsumer,
)
import json

from .models import UserProfile


def set_user_online(user: UserProfile):
    user.online = True
    user.save()


def set_user_offline(user: UserProfile):
    user.online = False
    user.save()


class UserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["user_id"]
        self.room_group_name = "user_%s" % self.room_name

        user = self.scope["user"]

        set_user_online(user.profile)

        # Join room conversation
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, code):
        user = self.scope["user"]

        set_user_online(user.profile)

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json: dict = json.loads(text_data)
        message = text_data_json["message"]
        type = text_data_json.get("type", None)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "send_notification", "message": message, "type": type},
        )

    async def send_notification(self, event: dict):
        message = event["message"]
        type = event["type"]

        self.send(text_data=json.dumps({"message": message, "type": type}))
