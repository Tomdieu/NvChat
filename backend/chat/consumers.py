from channels.generic.websocket import AsyncWebsocketConsumer
import json
from asgiref.sync import sync_to_async

from .models import GroupMessage,Message


class UserNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["user_id"]
        self.room_group_name = "notification_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        # Leave room group
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_notification", "message": message}
        )
        # return await super().receive(text_data, bytes_data)

    async def send_notification(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))


class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["group_chat_id"]
        self.room_group_name = "group_chat_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_notification", "message": message}
        )
        # return await super().receive(text_data, bytes_data)

    async def send_notification(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
    
    @sync_to_async
    def save_chat_message(self, event):
        pass


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.room_group_name = "conversation_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_notification", "message": message}
        )

    async def send_notification(self, event):
        message = event["message"]

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))
    
    @sync_to_async
    def save_chat_message(self, event):
        pass


# class PostConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         return await super().connect()

#     async def disconnect(self, code):
#         return await super().disconnect(code)

#     async def receive(self, text_data=None, bytes_data=None):
#         return await super().receive(text_data, bytes_data)

#     async def send_notification(self, message):
#         pass
