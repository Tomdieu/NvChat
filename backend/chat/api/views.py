from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)

from rest_framework.generics import CreateAPIView

import asyncio
from channels.layers import get_channel_layer

from chat.models import (
    GroupMember,
    Conversation,
    Message,
    GroupMessage,
    ChatGroup,
)

from rest_framework.parsers import (
    MultiPartParser,
    FormParser,
)

from rest_framework.views import APIView


from .serializers import (
    ChatGroupSerializer,
    ChatGroupCreateSerializer,
    ChatGroupImageSerializer,
    CreateConversationSerializer,
    ConversationSerializer,
    MessageListSerializer,
    MessageSerializer,
    MessageCreateSerializer,
    GroupMessageListSerializer,
    GroupMemberCreateSerializer,
    GroupMemberSerializer,
    GMSerializer,
    IMessagePolymorphicSerializer,
    DiscussionCreateSerializer,
)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import status

from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class ChatGroupViewSet(
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_queryset(self):
        queryset = ChatGroup.objects.filter(members__user=self.request.user)

        return queryset

    def get_serializer_class(self):
        if self.request.method.upper() in ["POST", "PATCH", "PUT"]:
            return ChatGroupCreateSerializer
        else:
            return ChatGroupSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)

        return Response(
            {"data": serializer.data, "success": True}, status=status.HTTP_200_OK
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["created_by"] = self.request.user.profile
        instance: ChatGroup = serializer.save()
        instance.members.add(self.request.user.profile)
        instance.set_member_as_admin(self.request.user.profile)

        return Response(
            {
                "data": ChatGroupSerializer(
                    instance=ChatGroup.objects.get(id=instance.id),
                    context={"request": request},
                ).data
            },
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        saveObject = serializer.save()

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(
            ChatGroupSerializer(saveObject, context={"request": request}).data
        )


class UpdatedGroupImageViewSet(RetrieveModelMixin, UpdateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    parser_classes = [MultiPartParser, FormParser]

    serializer_class = ChatGroupImageSerializer

    def get_queryset(self):
        return ChatGroup.objects.filter(members__user=self.request.user)


class AddMemberToGroupViewSet(CreateAPIView, GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = GMSerializer

    queryset = GroupMember.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group = serializer.validated_data["group"]

        user = serializer.validated_data["user"]

        chatGroup = ChatGroup.objects.get(id=group.pk)

        chatGroup.add_member(user)

        channel_layer = get_channel_layer()
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(
            channel_layer.group_send(
                f"user_{user.id}",
                {
                    "type": "send_notification",
                    "msgType": "NEW_GROUP",
                    "message": ChatGroupSerializer(
                        ChatGroup.objects.get(id=group.pk), context={"request": request}
                    ).data,
                },
            )
        )

        return Response(
            {"message": "added member to group", "success": True},
            status=status.HTTP_201_CREATED,
        )


class removeMemberFromGroupViewSet(CreateAPIView, GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = GMSerializer

    queryset = GroupMember.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        group = serializer.validated_data["group"]

        user = serializer.validated_data["user"]

        chatGroup = ChatGroup.objects.get(id=group.pk)

        chatGroup.remove_member(user)

        return Response(
            {"message": "member remove from group", "success": True},
            status=status.HTTP_201_CREATED,
        )


class JoinGroupViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = GroupMemberCreateSerializer

    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    queryset = GroupMember.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GroupChatMessageViewSet(
    GenericViewSet,
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    CreateModelMixin,
):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = GroupMessageListSerializer

    def get_queryset(self):
        return GroupMessage.objects.all()

    def retrieve(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        instance = queryset.filter(chat=kwargs.get("pk"))
        if not instance.exists():
            return Response({"data": []})
        return Response(
            {"data": self.get_serializer(instance).data}, status=status.HTTP_200_OK
        )


class ConversationViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_serializer_class(self):
        if self.request.method.upper() in ["POST"]:
            return CreateConversationSerializer
        return ConversationSerializer

    def get_queryset(self):
        # print(Conversation.objects.all(), self.request.user)
        return Conversation.objects.filter(participants__user=self.request.user)


class MessageViewSet(
    CreateModelMixin,
    ListModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_serializer_class(self):
        if self.request.method.upper() in ["GET", "PATCH", "DELETE"]:
            return MessageSerializer
        else:
            return MessageCreateSerializer

    queryset = Message.objects.all()


# Discussion Message Creation


class DisussionMessageApiView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def post(self, request, *args, **kwargs):
        conversation = Conversation.objects.get(id=kwargs["conversation_id"])

        request_data = request.data
        parent_message_id = request_data.get("parent_message_id", None)

        serializer = IMessagePolymorphicSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        newMessage = {}
        newMessage["message"] = instance
        newMessage["conversation"] = conversation
        newMessage["sender"] = request.user.profile
        newMessage["parent_message"] = None

        parent_message = Message.objects.filter(id=parent_message_id)
        if parent_message.exists():
            newMessage["parent_message"] = parent_message.first()

        msg = Message.objects.create(**newMessage)

        msg_serializer = MessageListSerializer(msg, context={"request": request})

        return Response(
            {
                "data": msg_serializer.data,
            }
        )


class GroupMessageApiView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def post(self, request, *args, **kwargs):
        chat = ChatGroup.objects.get(id=kwargs["chat_group_id"])

        request_data = request.data
        parent_message_id = request_data.get("parent_message_id", None)

        serializer = IMessagePolymorphicSerializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        newMessage = {}
        newMessage["message"] = instance
        newMessage["chat"] = chat
        newMessage["sender"] = request.user.profile
        newMessage["parent_message"] = None

        parent_message = GroupMessage.objects.filter(id=parent_message_id)
        if parent_message.exists():
            newMessage["parent_message"] = parent_message.first()

        msg = GroupMessage.objects.create(**newMessage)

        msg_serializer = GroupMessageListSerializer(msg, context={"request": request})

        return Response(
            {
                "data": msg_serializer.data,
            }
        )


class GroupMemberViewSet(
    UpdateModelMixin, GenericViewSet, RetrieveModelMixin, DestroyModelMixin
):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = GroupMemberSerializer

    queryset = GroupMember.objects.all()


class CreateDiscussionView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def post(self, request, *args, **kwargs):
        serializer = DiscussionCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.validated_data["with_user"]

        disc = Conversation.objects.create()
        disc.participants.add(user)
        disc.participants.add(request.user.profile)

        serializer = ConversationSerializer(
            Conversation.objects.get(id=disc.id), context={"request": request}
        )

        channel_layer = get_channel_layer()
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(
            channel_layer.group_send(
                f"user_{user.id}",
                {
                    "type": "send_notification",
                    "msgType": "NEW_CONVERSATION",
                    "message": serializer.data,
                },
            )
        )

        return Response(serializer.data)
