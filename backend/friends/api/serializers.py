from rest_framework import serializers

from ..models import FriendList, FriendRequest
from account.models import UserProfile
from django.contrib.auth import get_user_model

from django.db.models import Q

from account.api.serializers import UserProfileSerializer, UserSerializer
from .utils import get_friend_request_or_false

User = get_user_model()


class FriendListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    friends = UserProfileSerializer(many=True)

    class Meta:
        model = FriendList
        fields = "__all__"


class FriendRequestCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = "__all__"
        extra_kwargs = {"sender": {"read_only": True}}


class FriendRequestSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer()
    reciever = UserProfileSerializer()

    you_send = serializers.SerializerMethodField()

    class Meta:
        model = FriendRequest
        fields = "__all__"

    def get_you_send(self, obj: FriendRequest):
        return obj.sender == self.context["request"].user.profile


class SearchFriendSerializer(serializers.ModelSerializer):
    is_friend = serializers.SerializerMethodField()
    is_self = serializers.SerializerMethodField()
    you_send_friend_request = serializers.SerializerMethodField()
    them_send_friend_request = serializers.SerializerMethodField()
    no_request_send = serializers.SerializerMethodField()
    friend_request = serializers.SerializerMethodField()

    user = UserSerializer(read_only=True)

    friend = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_is_friend(self, obj: UserProfile):
        friend_list: FriendList = self.context["request"].user.profile.friend_list
        return obj in friend_list.friends.all()

    def get_is_self(self, obj: UserSerializer):
        return obj == self.context["request"].user.profile

    def get_you_send_friend_request(self, obj: UserProfile):
        friend_request = FriendRequest.objects.filter(
            sender=self.context["request"].user.profile, reciever=obj, is_active=True
        )
        if friend_request.exists():
            return True
        return False

    def get_them_send_friend_request(self, obj: UserProfile):
        friend_request = FriendRequest.objects.filter(
            sender=obj, reciever=self.context["request"].user.profile, is_active=True
        )
        if friend_request.exists():
            return True
        return False

    def get_no_request_send(self, obj: UserProfile):
        friend_request = FriendRequest.objects.filter(
            (Q(sender=obj) & Q(reciever=self.context["request"].user.profile))
            | (Q(sender=self.context["request"].user.profile) & Q(reciever=obj))
        )

        print(friend_request)

        if friend_request.exists():
            return False
        return True

    def get_friend(self, obj: UserProfile):
        friends: UserProfile = obj.friend_list.friends.all()
        # print(friends)
        if friends:
            serializer = UserProfileSerializer(friends, context=self.context, many=True)
            return serializer.data
        return []

    def pending_friend_request_id(self, obj: UserProfile):
        result = get_friend_request_or_false(
            sender=obj, reciever=self.context["request"].user.profile
        )
        if result != False:
            return result.id

    def get_friend_request(self, obj: UserProfile):
        if obj == self.context["request"].user.profile:
            friend_request = FriendRequest.objects.filter(
                sender=self.context["request"].user.profile, is_active=True
            )
            return FriendRequestSerializer(friend_request, many=True).data
        return None
