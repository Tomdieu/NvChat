from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)

from chat.models import (
    UserProfile,
    Message,
    GroupMessage,
    ChatGroup,
    Post,
    Notification,
)
from .serializers import (
    ChatGroupSerializer,
    MessageSerializer,
    UserProfileSerializer,
    GroupMessageSerializer,
    GroupMessageListSerializer,
    GroupMessageCreateSerializer,
    IMessagePolymorphicSerializer,
    PostSerializer,
    PostListSerializer,
    NotificationSerializer,
    NotificationListSerializer,
)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import status


class UserViewSet(ListModelMixin, CreateModelMixin, GenericViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer


class ChatGroupViewSet(
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer


class GroupMessageViewSet(
    ListModelMixin, CreateModelMixin, DestroyModelMixin, GenericViewSet
):
    def get_serializer_class(self):
        if self.request.method.upper() in ["GET"]:
            return GroupMessageListSerializer
        if self.request.method.upper() in ["POST"]:
            return GroupMessageCreateSerializer
        return GroupMessageSerializer

    queryset = GroupMessage.objects.all()

    def create(self, request, *args, **kwargs):
        data = request.data

        imessageSerializer = IMessagePolymorphicSerializer(
            data=request.data.get("message")
        )
        imessageSerializer.is_valid(raise_exception=True)
        imessage = imessageSerializer.save()

        data["message"] = imessage.id

        serializer = GroupMessageSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        dt = serializer.save()

        return Response(
            {"data": GroupMessageListSerializer(instance=dt).data, "success": True},
            status=status.HTTP_201_CREATED,
        )


class MessageViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class PostViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class NotificationViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    def get_serializer_class(self):
        if self.request.method.upper() in ["GET"]:
            return NotificationListSerializer
        return NotificationSerializer

    queryset = Notification.objects.all()
