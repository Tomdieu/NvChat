from channels.generic.websocket import AsyncWebsocketConsumer
import json


class UserNotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        return await super().connect()

    async def disconnect(self, code):
        return await super().disconnect(code)

    async def receive(self, text_data=None, bytes_data=None):
        return await super().receive(text_data, bytes_data)

    async def send_notification(self, message):
        pass


class GroupChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        return await super().connect()

    async def disconnect(self, code):
        return await super().disconnect(code)

    async def receive(self, text_data=None, bytes_data=None):
        return await super().receive(text_data, bytes_data)

    async def send_notification(self, message):
        pass


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        return await super().connect()

    async def disconnect(self, code):
        return await super().disconnect(code)

    async def receive(self, text_data=None, bytes_data=None):
        return await super().receive(text_data, bytes_data)

    async def send_notification(self, message):
        pass


class PostConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        return await super().connect()

    async def disconnect(self, code):
        return await super().disconnect(code)

    async def receive(self, text_data=None, bytes_data=None):
        return await super().receive(text_data, bytes_data)

    async def send_notification(self, message):
        pass
