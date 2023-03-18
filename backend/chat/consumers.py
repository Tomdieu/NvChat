from channels.generic.websocket import AsyncWebsocketConsumer
import json
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async

from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os

from django.core import files
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
    ChatGroupSerializer,
)


# This function is use to save a file
def save_file(url: str, file_bytes: bytes, folder: str) -> None:
    if not os.path.exists(folder):
        os.mkdir(folder)
    storage = FileSystemStorage(location=url)
    with storage.open("", "wb+") as destination:
        destination.write(file_bytes)
        destination.close()


# this function is use to create a message and assigning that message to a GroupMessage or a Message
def create_message(
    messageType: str,
    conversationId: int,
    message: dict,
    sender,
    parent_message=None,
    filename=None,
):
    msgContent = message
    resourceType = msgContent.pop("resourcetype")
    if resourceType == "TextMessage":
        msgContent = TextMessage.objects.create(**msgContent)
    elif resourceType == "ImageMessage":
        image_data = msgContent["image"].split(";base64,")[-1]
        image_bytes = base64.b64decode(image_data)

        url = os.path.join(
            settings.MEDIA_ROOT, ImageMessage.image.field.upload_to, filename
        )

        save_file(
            url,
            image_bytes,
            folder=f"{settings.MEDIA_ROOT}/{ImageMessage.image.field.upload_to}",
        )

        imageMessage = ImageMessage(caption=msgContent["caption"])
        imageMessage.save()
        imageMessage.image.save(filename, files.File(open(url, "rb")), save=True)
        imageMessage.save()

        # storage.delete()

        os.remove(url)

        msgContent = imageMessage
    elif resourceType == "VideoMessage":
        video_data = msgContent["video"].split(";base64,")[-1]
        video_bytes = base64.b64decode(video_data)

        url = os.path.join(
            settings.MEDIA_ROOT, VideoMessage.video.field.upload_to, filename
        )

        save_file(
            url,
            video_bytes,
            folder=f"{settings.MEDIA_ROOT}/{VideoMessage.video.field.upload_to}",
        )

        videoMessage = VideoMessage(caption=msgContent["caption"])
        videoMessage.save()
        videoMessage.video.save(filename, files.File(open(url, "rb")), save=True)
        videoMessage.save()

        os.remove(url)
        msgContent = videoMessage
    elif resourceType == "FileMessage":
        file_data = msgContent["file"].split(";base64,")[-1]
        file_bytes = base64.b64decode(file_data)

        url = os.path.join(
            settings.MEDIA_ROOT, FileMessage.file.field.upload_to, filename
        )

        save_file(
            url,
            file_bytes,
            folder=f"{settings.MEDIA_ROOT}/{FileMessage.file.field.upload_to}",
        )

        fileMessage = FileMessage(caption=msgContent["caption"])
        fileMessage.save()
        fileMessage.file.save(filename, files.File(open(url, "rb")), save=True)

        # storage.delete()

        msgContent = fileMessage
        os.remove(url)

    if messageType == "conversation":
        conversation = Conversation.objects.get(id=conversationId)
        newMessage = {}
        newMessage["parent_message"] = parent_message
        newMessage["conversation"] = conversation
        newMessage["message"] = msgContent
        newMessage["sender"] = sender
        return Message.objects.create(**newMessage)
    elif messageType == "group":
        chat_group = ChatGroup.objects.get(id=conversationId)
        newMessage = {}
        newMessage["parent_message"] = parent_message
        newMessage["message"] = msgContent
        newMessage["chat"] = chat_group
        newMessage["sender"] = sender

        return GroupMessage.objects.create(**newMessage)


# Single Chat Consumer


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
        file_name = text_data_json.get("filename")
        typing = text_data_json.get("typing")

        print(text_data_json)

        if typing:
            if typing == True:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "send_typing",
                        "message": message,
                        "typing": True,
                        "sender": self.scope["user"].username,
                    },
                )

            elif typing == False:
                await self.channel_layer.group_send(
                    self.room_group_name,
                    {
                        "type": "send_typing",
                        "message": message,
                        "typing": False,
                        "sender": self.scope["user"].username,
                    },
                )
        else:
            instance = await self.save_message(message, fileName=file_name)
            serializer = MessageListSerializer(instance)
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "send_message", "message": serializer.data},
            )

    async def send_typing(self, event):
        message = event["message"]
        typing = event["typing"]
        username = event["sender"]
        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "typing": typing,
                    "sender": username,
                }
            )
        )

    async def send_message(self, event):
        message = event["message"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))

    @sync_to_async
    def save_message(self, message, parent_message=None, fileName=None):
        return create_message(
            messageType="conversation",
            message=message,
            conversationId=self.room_name,
            sender=self.scope["user"].profile,
            parent_message=parent_message,
            filename=fileName,
        )


# Group Chat Consumer
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
        file_name = text_data_json.get("filename")
        typing = text_data_json.get("typing")

        if typing == True:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_typing",
                    "message": message,
                    "typing": True,
                    "sender": self.scope["user"].username,
                },
            )

        elif typing == False:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "send_typing",
                    "message": message,
                    "typing": False,
                    "sender": self.scope["user"].username,
                },
            )
        if typing == None:
            instance = await self.save_chat_message(message, fileName=file_name)
            serializer = GroupMessageListSerializer(instance)
            await self.channel_layer.group_send(
                self.room_group_name,
                {"type": "send_message", "message": serializer.data},
            )

    async def send_typing(self, event):
        message = event["message"]
        typing = event["typing"]
        username = event["sender"]
        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "typing": typing,
                    "sender": username,
                }
            )
        )

    async def send_message(self, event):
        message = event["message"]
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message}))

    @sync_to_async
    def save_chat_message(self, message, parent_message=None, fileName=None):
        return create_message(
            messageType="group",
            message=message,
            conversationId=self.room_name,
            sender=self.scope["user"].profile,
            parent_message=parent_message,
            filename=fileName,
        )
