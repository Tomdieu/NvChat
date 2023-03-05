from rest_framework import serializers
from ..models import FriendList, FriendRequest
from account.api.serializers import UserProfileSerializer


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


class FriendRequestSerializer(serializers.ModelSerializer):
    sender = UserProfileSerializer()
    reciever = UserProfileSerializer()

    class Meta:
        model = FriendRequest
        fields = "__all__"
