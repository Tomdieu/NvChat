from rest_framework.mixins import (
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
)

from rest_framework.generics import CreateAPIView

from django.contrib.auth import authenticate, login

from chat.models import (
    GroupMember,
    Conversation,
    Message,
    GroupMessage,
    ChatGroup,
)

from account.models import UserProfile
from account.api.serializers import UserProfileSerializer

from .serializers import (
    ChatGroupSerializer,
    ChatGroupCreateSerializer,
    ChatGroupListSerializer,
    CreateConversationSerializer,
    ConversationSerializer,
    MessageSerializer,
    MessageCreateSerializer,
    # GroupMessageSerializer,
    GroupMessageListSerializer,
    # GroupMessageCreateSerializer,
    GroupMemberSerializer,
    # AuthenticationSerializer,
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
        return ChatGroup.objects.filter(members__user=self.request.user)

    def get_serializer_class(self):
        if self.request.method.upper() in ["POST"]:
            return ChatGroupCreateSerializer
        else:
            return ChatGroupListSerializer
            # return ChatGroupSerializer

    # queryset = ChatGroup.objects.all()

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
      
        return Response({'data':serializer.data,'success':True},status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data["created_by"] = self.request.user.profile
        instance = serializer.save()
        instance.participant.add(self.request.user.profile)

        return Response(
            {"data": ChatGroupSerializer(instance=instance).data},
            status=status.HTTP_201_CREATED,
        )

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

    def partial_update(self, request, *args, **kwargs):
        return super().partial_update(request, *args, **kwargs)


class JoinGroupViewSet(GenericViewSet, CreateModelMixin):
    serializer_class = GroupMemberSerializer

    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]
    
    queryset = GroupMember.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GroupChatMessageViewSet(GenericViewSet, RetrieveModelMixin):
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
