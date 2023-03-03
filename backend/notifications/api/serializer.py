from rest_framework import serializers
from ..models import Notification

from account.api.serializers import UserProfileSerializer


class NotificationSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()

    class Meta:
        model = Notification
        fields = "__all__"
