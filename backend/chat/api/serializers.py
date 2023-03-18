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
    GroupMessageView,
)

from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from account.api.serializers import UserProfileSerializer
from account.models import UserProfile

from django.db import transaction

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


class GroupMemberCreateSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = GroupMember
        fields = "__all__"

    def create(self, validated_data):
        validated_data["user"] = self.context["request"].user.profile
        group_member = GroupMember.objects.create(**validated_data)

        return group_member


class ChatGroupSerializer(serializers.ModelSerializer):
    created_by = UserProfileSerializer(read_only=True)
    group_members = GroupMemberCreateSerializer(read_only=True, many=True)

    latest_message = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()

    class Meta:
        model = ChatGroup
        exclude = ["members"]

    def get_latest_message(self, obj: ChatGroup):
        if obj.messages.last() == None:
            return None
        return GroupMessageSerializer(obj.messages.last()).data

    def get_messages(self, obj: ChatGroup):
        return GroupMessageSerializer(obj.messages.all(), many=True).data


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
        GroupInvitationMessage: GroupInvitationMessageSerializer,
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
    parent_message = serializers.SerializerMethodField()

    class Meta:
        model = Message
        fields = "__all__"

    def get_parent_message(self, obj):
        if obj.parent_message is None:
            return None
        serializer = self.__class__(obj.parent_message)
        return serializer.data


class CreateConversationSerializer(serializers.Serializer):
    # TODO user1 and user2 represents the id of user 1 and 2  respectively

    user1 = serializers.IntegerField()
    user2 = serializers.IntegerField()

    def get_user(self, id):
        return UserProfile.objects.filter(id=id)

    def validate_user1(self, value):
        user1 = self.get_user(id=value)

        if not user1.exists():
            raise serializers.ValidationError(
                "Sorry the user with id %s does not exist" % (value)
            )

        return user1

    def validate_user2(self, value):
        user2 = self.get_user(id=value)

        if not user2.exists():
            raise serializers.ValidationError(
                "Sorry the user with id %s does not exist" % (value)
            )

        return user2

    def validate(self, attrs):
        if attrs.get("user1") == attrs.get("user2"):
            raise serializers.ValidationError("User 1 and user 2 must be different")
        return super().validate(attrs)

    def create(self, validated_data):
        # print(validated_data)
        user1 = validated_data["user1"]
        # print(user1)
        user2 = validated_data["user2"]
        # print(user2)

        # if user1.id == user2.id:
        #     raise serializers.ValidationError("user 1 and user 2 must be different!")
        with transaction.atomic():
            conversation = Conversation.objects.create()

            conversation.participants.add(user1.first(), user2.first())

            conversation.save()

            return conversation


class UserProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ["profile_picture"]


class ConversationSerializer(serializers.ModelSerializer):
    participants = UserProfileSerializer(many=True)
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
        if obj.messages.last():
            return MessageListSerializer(obj.messages.last(), context=self.context).data
        return None

    def get_messages(self, obj: Conversation):
        return MessageListSerializer(
            obj.messages.all(), many=True, context=self.context
        ).data

    def get_imageUrl(self, obj: Conversation):
        user = self.get_user(obj)
        # print(user.profile_picture.url)
        # print(dir(self.context["request"]))
        if user.profile_picture:
            return UserProfileImageSerializer(user, context=self.context).data.get(
                "profile_picture"
            )
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
    message = IMessagePolymorphicSerializer()
    sender = UserProfileSerializer()

    # message =
    class Meta:
        model = GroupMessage
        fields = "__all__"


class GroupMessageViewSerializer(serializers.ModelSerializer):
    viewer = UserProfileSerializer()

    class Meta:
        model = GroupMessageView
        # fields = '__all__'
        exclude = ["message"]


class GroupMessageListSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer(read_only=True)
    sender = UserProfileSerializer(read_only=True)
    # chat = ChatGroupSerializer()
    parent_message = serializers.SerializerMethodField()

    view_by = serializers.SerializerMethodField()

    number_of_non_view_message = serializers.SerializerMethodField()

    class Meta:
        model = GroupMessage
        # fields = "__all__"
        exclude = ["chat"]

    def get_parent_message(self, obj: GroupMessage):
        if obj.parent_message is None:
            return None
        serializer = self.__class__(obj.parent_message)
        return serializer.data
        # return GroupMessageSerializer(obj.parent_message).data

    def get_view_by(self, obj: GroupMessage):
        try:
            if obj.viewed.all():
                return GroupMessageViewSerializer(obj.viewed.all(), many=True).data
        except:
            return None

    def get_number_of_non_view_message(self, obj: GroupMessage):
        return 0


class GroupMessageCreateSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer()

    class Meta:
        model = GroupMessage
        fields = "__all__"


class ChatGroupImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ("image",)


class ChatGroupListSerializer(serializers.ModelSerializer):
    members = UserProfileSerializer(many=True)
    created_by = UserProfileSerializer()
    latest_message = serializers.SerializerMethodField()
    messages = serializers.SerializerMethodField()

    class Meta:
        model = ChatGroup
        fields = "__all__"

    def get_latest_message(self, obj: ChatGroup):
        return GroupMessageListSerializer(obj.messages.last()).data

    def get_messages(self, obj: ChatGroup):
        return GroupMessageListSerializer(obj.messages.all(), many=True).data


class GroupMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMember
        fields = "__all__"


class GMSerializer(serializers.Serializer):
    user = serializers.IntegerField()
    group = serializers.IntegerField()

    def validate_user(self, user):
        _user = UserProfile.objects.filter(id=user)
        if not _user.exists():
            raise serializers.ValidationError({"user": "this user doesn't exits"})

        return _user.first()

    def validate_group(self, group):
        _group = ChatGroup.objects.filter(id=group)
        if not _group.exists():
            raise serializers.ValidationError({"group": "this group doesn't exits"})

        return _group.first()
