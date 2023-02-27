from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async

from django.core.files.storage import default_storage

from .models import (
    ChatGroup,
    GroupMessage,
    TextMessage,
    ImageMessage,
    VideoMessage,
    FileMessage,
    Conversation,
)
from .api.serializers import (
    IMessagePolymorphicSerializer,
    GroupMessageListSerializer,
    MessageListSerializer,
    Message,
    GroupMessage,
)


def create_message(messageType: str, conversationId: int, message: dict, sender):
    msgContent = message
    resourceType = msgContent.pop("resourcetype")
    messageType = None
    if resourceType == "TextMessage":
        messageType = TextMessage.objects.create(**msgContent)
    elif resourceType == "ImageMessage":
        messageType = ImageMessage.objects.create(**msgContent)
    elif resourceType == "VideoMessage":
        msgContent = VideoMessage.objects.create(**msgContent)
    elif resourceType == "FileMessage":
        msgContent = FileMessage.objects.create(**msgContent)

    # serializer = IMessagePolymorphicSerializer(data=msgContent)
    # serializer.is_valid()
    # msgContent = serializer.save()

    print(messageType,conversationId,msgContent,sender)

    if messageType == "conversation":
        conversation = Conversation.objects.get(id=conversationId)
        msgContent["message"] = msgContent
        msgContent["chat"] = conversation
        msgContent["sender"] = sender
        return Message.objects.create(**msgContent)
    elif messageType == "group":
        chat_group = ChatGroup.objects.get(id=conversationId)
        msgContent["message"] = msgContent
        msgContent["chat"] = chat_group
        msgContent["sender"] = sender

        return GroupMessage.objects.create(**msgContent)

class ConversationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope["url_route"]["kwargs"]["conversation_id"]
        self.room_group_name = "conversation_%s" % self.room_name

        # Join room conversation
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)

        await self.accept()

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        type:str = text_data_json.get('type')
        print("Recieve message : ", message,type)
        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "send_message", "message": message,"message_type":type}
        )

    async def send_message(self, event):
        message = event["message"]

        instance = self.save_chat_message(message)
        print(instance)
        print(dir(instance))
        # serializer = MessageListSerializer(instance)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))

    @database_sync_to_async
    def save_chat_message(self, message):
        return create_message(
            messageType="conversation",
            message=message,
            conversationId=self.room_name,
            sender=self.scope["user"].profile,
        )











































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
            self.room_group_name, {"type": "send_message", "message": message}
        )

    async def send_message(self, event):
        message = event["message"]

        save_message = await self.save_chat_message(message)

        serializer = GroupMessageListSerializer(save_message)

        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": serializer.data}))

    @database_sync_to_async
    def save_chat_message(self, message):
        return create_message(
            messageType="group",
            message=message,
            conversationId=self.room_name,
            sender=self.scope["user"].profile,
        )
