from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async, async_to_sync

from django.core.files.storage import default_storage,Storage,FileSystemStorage
from django.conf import settings

from PIL import Image as PILImage
from io import BytesIO
import base64

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
    GroupMessageListSerializer,
    MessageListSerializer,
    Message,
    GroupMessage,
)


def isImage(message):
    msg = message
    return msg.pop("resourcetype") == "ImageMessage"

def isFile(message):
    msg = message
    return msg.pop("resourcetype") == "FileMessage"

def isVideo(message):
    msg = message
    return msg.pop("resourcetype") == "VideoMessage"


def create_message(
    messageType: str, conversationId: int, message: dict, sender, parent_message=None
):
    msgContent = message
    resourceType = msgContent.pop("resourcetype")
    if resourceType == "TextMessage":
        msgContent = TextMessage.objects.create(**msgContent)
    elif resourceType == "ImageMessage":
        msgContent = ImageMessage.objects.create(**msgContent)
    elif resourceType == "VideoMessage":
        msgContent = VideoMessage.objects.create(**msgContent)
    elif resourceType == "FileMessage":
        msgContent = FileMessage.objects.create(**msgContent)

    # serializer = IMessagePolymorphicSerializer(data=msgContent)
    # serializer.is_valid()
    # msgContent = serializer.save()
    # VideoMessage.video.field.upload_to

    print(
        "Message type : ",
        messageType,
        "Conversation Id ",
        conversationId,
        "Message Content ",
        msgContent,
        "Sender ",
        sender,
    )

    if messageType == "conversation":
        conversation = Conversation.objects.get(id=conversationId)
        newMessage = {}
        newMessage["conversation"] = conversation
        newMessage["message"] = msgContent
        newMessage["sender"] = sender
        return Message.objects.create(**newMessage)
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
        # type: str = text_data_json.get("type")
        # Send message to room group
        # print("Image : ",message['image'])
        # if bytes_data:
        #     new_path = ""
        #     print("Byte Data : ",bytes_data)
        #     if isImage(message):
        #         new_path = settings.MEDIA_ROOT + ImageMessage.image.field.upload_to
        #     if isVideo(message):
        #         new_path = settings.MEDIA_ROOT + VideoMessage.video.field.upload_to
                
        #     if isFile(message):
        #         new_path = settings.MEDIA_ROOT + FileMessage.file.field.upload_to
        #     request_file = bytes_data
        #     fs = FileSystemStorage()
        #     file = fs.save(request_file.name,request_file)
        #     fileUrl = fs.url(file)

        # if True:
        #     image_data= text_data_json['image'].split(";base64;")[-1]
        #     image_bytes = base64.b64decode(image_data)
        #     image_file = BytesIO(image_bytes)
        #     image = PILImage.open(image_file)

        #     # image_message.image.save(filename,image,save=True)
                

        instance = await self.save_message(message)
        print(instance)
        serializer = MessageListSerializer(instance)
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "send_message", "message": serializer.data},
        )

    async def send_message(self, event):
        message = event["message"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))

    @sync_to_async
    def save_message(self, message):
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
