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
    CreateConversationSerializer,
    ConversationSerializer,
    MessageSerializer,
    MessageCreateSerializer,
    GroupMessageSerializer,
    GroupMessageListSerializer,
    GroupMessageCreateSerializer,
    IMessagePolymorphicSerializer,
    GroupMemberSerializer,
    # GroupMemberCreateSerializer,
    AuthenticationSerializer,
)
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from rest_framework import status

from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated


class UserRegistrationViewSet(GenericViewSet, CreateModelMixin):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(
            {"data": serializer.data, "message": "Account Created Successfully"},
            status=status.HTTP_201_CREATED,
        )


class UserViewSet(
    ListModelMixin,
    RetrieveModelMixin,
    DestroyModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(
            {"data": serializer.data, "message": "Successfully get profile"}
        )


class AuthenticationViewSet(GenericViewSet, CreateAPIView):
    # permission_classes = [AllowAny]

    serializer_class = AuthenticationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response(
                {
                    "data": UserProfileSerializer(user.profile).data,
                    "token": user.auth_token.key,
                },
                status=status.HTTP_200_OK,
            )
        return Response(
            {"message": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST
        )


class ChatGroupViewSet(
    ListModelMixin,
    CreateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method.upper() in ["POST"]:
            return ChatGroupCreateSerializer
        else:
            return ChatGroupSerializer

    queryset = ChatGroup.objects.all()

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

    # def get_serializer_class(self):
    #     if self.request.method.upper() in ["GET"]:
    #         return GroupMemberSerializer

    #     else:
    #         return GroupMemberCreateSerializer

    permission_classes = [IsAuthenticated]
    
    queryset = GroupMember.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance = serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GroupChatMessageViewSet(GenericViewSet, RetrieveModelMixin):
    permission_classes = [IsAuthenticated]

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
        print(Conversation.objects.all(), self.request.user)
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

    def get_serializer_class(self):
        if self.request.method.upper() in ["GET", "PATCH", "DELETE"]:
            return MessageSerializer
        else:
            return MessageCreateSerializer

    queryset = Message.objects.all()


# class GroupChatMembersViewSet(GenericViewSet, RetrieveModelMixin):
#     permission_classes = [IsAuthenticated]

#     queryset = GroupMember.objects.all()

#     serializer_class = GroupMemberSerializer

#     def retrieve(self, request, *args, **kwargs):
#         queryset = self.get_queryset()
#         instance = queryset.filter(group=kwargs.get("pk"))
#         if not instance.exists():
#             return Response({"data": []})
#         return Response(
#             {"data": self.get_serializer(instance).data}, status=status.HTTP_200
#         )


# class GroupMessageViewSet(
#     ListModelMixin,
#     CreateModelMixin,
#     DestroyModelMixin,
#     UpdateModelMixin,
#     GenericViewSet,
# ):
#     permission_classes = [IsAuthenticated]

#     def get_serializer_class(self):
#         if self.request.method.upper() in ["GET"]:
#             return GroupMessageListSerializer
#         if self.request.method.upper() in ["POST"]:
#             return GroupMessageCreateSerializer
#         return GroupMessageSerializer

#     queryset = GroupMessage.objects.all()

#     def create(self, request, *args, **kwargs):
#         data = request.data

#         imessageSerializer = IMessagePolymorphicSerializer(
#             data=request.data.get("message")
#         )
#         imessageSerializer.is_valid(raise_exception=True)
#         imessage = imessageSerializer.save()

#         data["message"] = imessage.id

#         serializer = GroupMessageSerializer(data=data)
#         serializer.is_valid(raise_exception=True)
#         dt = serializer.save()

#         return Response(
#             {"data": GroupMessageListSerializer(instance=dt).data, "success": True},
#             status=status.HTTP_201_CREATED,
#         )
