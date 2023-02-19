from chat.models import (
    GroupMember,
    IMessage,
    ImageMessage,
    VideoMessage,
    TextMessage,
    FileMessage,
    InvitationMessage,
    GroupInvitationMessage,
    Conversation,
    Message,
    ChatGroup,
    GroupMessage,
)

from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from account.api.serializers import UserProfileSerializer
from account.models import UserProfile

from django.db.models import Q


class ImessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMessage
        fields = "__all__"


class ImageMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMessage
        fields = "__all__"


class VideoMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMessage
        fields = "__all__"


class TextMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextMessage
        fields = "__all__"


class FileMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileMessage
        fields = "__all__"



class InvitationMessageSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer()
    recipient = UserProfileSerializer()

    class Meta:
        model = InvitationMessage
        fields = "__all__"


class InvitationMessageCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = InvitationMessage
        fields = "__all__"


class ChatGroupSerializer(serializers.ModelSerializer):
    participant = UserProfileSerializer(many=True)
    created_by = UserProfileSerializer()

    class Meta:
        model = ChatGroup
        fields = "__all__"


class GroupInvitationMessageSerializer(serializers.ModelSerializer):
    group_chat = ChatGroupSerializer()
    sender = UserProfileSerializer()
    recipient = UserProfileSerializer()

    class Meta:
        model = GroupInvitationMessage
        fields = "__all__"


class IMessagePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        ImageMessage: ImageMessageSerializer,
        VideoMessage: VideoMessageSerializer,
        TextMessage: TextMessageSerializer,
        FileMessage: FileMessageSerializer,
        InvitationMessage: InvitationMessageSerializer,
        GroupInvitationMessage: GroupInvitationMessageSerializer
    }


class GroupMessageListSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer()
    sender = UserProfileSerializer()
    chat = ChatGroupSerializer()

    class Meta:
        model = GroupMessage
        fields = "__all__"


class MessageListSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer(many=False)
    sender = UserProfileSerializer()

    class Meta:
        model = Message
        fields = "__all__"


class ConversationSerializer(serializers.ModelSerializer):
    participants = UserProfileSerializer(
        many=True,
    )
    title = serializers.SerializerMethodField()
    latest_message = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()
    imageUrl = serializers.SerializerMethodField()

    class Meta:
        model = Conversation
        fields = "__all__"

    def get_user(self, obj: Conversation) -> UserProfile:
        return obj.participants.get(~Q(user=self.context["request"].user))

    def get_title(self, obj: Conversation):
        return self.get_user(obj).user.get_username()

    def get_latest_message(self, obj: Conversation):
        return MessageListSerializer(obj.messages.last(), context=self.context).data

    def get_messages(self, obj: Conversation):
        return MessageListSerializer(
            obj.messages.all(), many=True, context=self.context
        ).data

    def get_imageUrl(self, obj: Conversation):
        user = self.get_user(obj)
        if user.profile_picture:
            return self.context["request"].build_absolute_uri(user.profile_picture)
        return None


class MessageSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer(many=False)
    sender = UserProfileSerializer()
    conversation = ConversationSerializer()

    class Meta:
        model = Message
        fields = "__all__"


class MessageCreateSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer(many=False)

    class Meta:
        model = Message
        fields = "__all__"


class GroupMemberSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    group = ChatGroupSerializer()

    class Meta:
        model = GroupMember
        fields = "__all__"


class ChatGroupMemberCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = "__all__"


class ChatGroupCreateSerializer(serializers.ModelSerializer):
    # participant = UserProfileSerializer(many=True)
    class Meta:
        model = ChatGroup
        fields = "__all__"
        extra_kwargs = {"created_by": {"read_only": True}}


class GroupMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMessage
        fields = "__all__"


class GroupMessageListSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer()
    sender = UserProfileSerializer()
    chat = ChatGroupSerializer()

    class Meta:
        model = GroupMessage
        fields = "__all__"


class GroupMessageCreateSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer()

    class Meta:
        model = GroupMessage
        fields = "__all__"


class AuthenticationSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=255)
    password = serializers.CharField(required=True, max_length=255)


class ChatGroupListSerializer(serializers.ModelSerializer):
    participant = UserProfileSerializer(many=True)
    created_by = UserProfileSerializer()
    latest_message = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()

    class Meta:
        model = ChatGroup
        fields = "__all__"

    def get_latest_message(self, obj: ChatGroup):
        return GroupMessageSerializer(obj.messages.last())

    def get_messages(self, obj: ChatGroup):
        return GroupMessageSerializer(obj.messages.all(), many=True)
