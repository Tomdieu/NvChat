from rest_framework.mixins import ListModelMixin
from rest_framework.response import Response

from rest_framework.viewsets import GenericViewSet


from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from ..models import Notification
from .serializer import NotificationSerializer


class NotificationViewSet(ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = NotificationSerializer

    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user.profile)
