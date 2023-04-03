from channels.generic.websocket import (
    AsyncWebsocketConsumer,
)
import json

from django.contrib.auth import get_user_model


from channels.db import database_sync_to_async


User = get_user_model()


class UserConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["user_id"]
        self.room_group_name = "user_%s" % self.room_name

        user = self.scope["user"]

        # Join room conversation
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

        # Set the user online
        await self.set_user_online(user)

    async def disconnect(self, code):
        user = self.scope["user"]

        # Set the user offline
        await self.set_user_offline(user.profile)

        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json: dict = json.loads(text_data)
        message = text_data_json["message"]
        msgType = text_data_json.get("msgType", None)

        print("Text Data Json : ", text_data_json)

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "send_notification", "message": message, "msgType": msgType},
        )

    async def send_notification(self, event: dict):
        message = event["message"]
        msgType = event["msgType"]

        print("Event : ", event)

        await self.send(text_data=json.dumps({"message": message, "msgType": msgType}))

    @database_sync_to_async
    def set_user_online(self, user: User):
        # This function is use to set a user online when the users connects to his socket channel
        try:
            profile = user.profile
            profile.online = True
            return profile.save()
        except:
            pass

    @database_sync_to_async
    def set_user_offline(self, user: User):
        try:
            profile = user.profile
            profile.online = False
            return profile.save()
        except:
            pass
