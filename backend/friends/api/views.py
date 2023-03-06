from rest_framework.response import Response
from rest_framework import status
from rest_framework.mixins import ListModelMixin
from rest_framework.viewsets import GenericViewSet

from rest_framework.generics import CreateAPIView, RetrieveAPIView, ListAPIView

from rest_framework.authentication import TokenAuthentication, SessionAuthentication
from rest_framework.permissions import IsAuthenticated

from django.db.models import Q

from account.models import UserProfile
from ..models import FriendList, FriendRequest
from .serializers import (
    FriendListSerializer,
    FriendRequestCreateSerializer,
    FriendRequestSerializer,
    SearchFriendSerializer,
)


class FriendListViewSet(GenericViewSet, ListModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = FriendListSerializer

    def get_queryset(self):
        return FriendList.objects.filter(user=self.request.user.profile)


class FriendRequestViewSet(GenericViewSet, ListModelMixin):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return FriendRequestSerializer
        return FriendRequestCreateSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(
            (
                Q(sender=self.request.user.profile)
                | Q(reciever=self.request.user.profile)
            )
            & Q(is_active=True)
        )


class SendFriendRequestView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = FriendRequestCreateSerializer

    def post(self, request, *args, **kwargs):
        userId = request.data.get("reciever")
        print(userId)

        if userId:
            reciever = UserProfile.objects.get(id=userId)
            try:
                # Get any friend requests(active and not active)
                friend_request = FriendRequest.objects.filter(
                    sender=request.user.profile, reciever=reciever
                )
                # Find if any of them are active

                try:
                    for request in friend_request:
                        if request.is_active:
                            return Response(
                                {
                                    "message": "You have already send a friend request.",
                                    "error": True,
                                },
                                status=status.HTTP_200_OK,
                            )
                    # if none are active create a new friend request
                    friend_request = FriendRequest(
                        sender=request.user.profile, reciever=reciever
                    )
                    friend_request.save()
                    return Response(
                        {"message": "Friend request send", "error": False},
                        status=status.HTTP_201_CREATED,
                    )
                except Exception as e:
                    return Response(
                        {"message": str(e)}, status=status.HTTP_400_BAD_REQUEST
                    )
            except Exception as e:
                # There are no friend request so create one
                friend_request = FriendRequest(
                    sender=request.user.profile, reciever=reciever
                )
                friend_request.save()
                return Response(
                    {"message": "Friend request send", "error": False},
                    status=status.HTTP_201_CREATED,
                )

        else:
            return Response(
                {"message": "Unable to send a friend request", "error": True},
                status=status.HTTP_400_BAD_REQUEST,
            )


class AcceptFriendRequestView(RetrieveAPIView):
    lookup_field = "pk"

    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = FriendRequestSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(sender=self.request.user.profile)

    def retrieve(self, request, *args, **kwargs):
        instance: FriendRequest = self.get_object()

        if not instance:
            return Response({"message": "Something went wrong", "success": False})

        if instance.reciever == request.user.profile:
            instance.accept()

            return Response({"message": "Friend Request Accepted", "success": True})
        else:
            return Response(
                {"message": "You are not authorize", "success": False},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class DenyFriendRequestView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = FriendListSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(sender=self.request.user.profile)

    def retrieve(self, request, *args, **kwargs):
        instance: FriendRequest = self.get_object()

        if not instance:
            return Response({"message": "Something went wrong", "success": False})

        if instance.reciever == request.user.profile:
            instance.decline()

            return Response({"message": "Friend Request Deny", "success": True})
        else:
            return Response(
                {"message": "You are not authorize", "success": False},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class CancelFriendRequestView(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = FriendListSerializer

    def get_queryset(self):
        return FriendRequest.objects.filter(sender=self.request.user.profile)

    def retrieve(self, request, *args, **kwargs):
        instance: FriendRequest = self.get_object()

        if not instance:
            return Response({"message": "Something went wrong", "success": False})

        if instance.sender == request.user.profile:
            instance.cancel()

            return Response({"message": "Friend Request Cancel", "success": True})
        else:
            return Response(
                {"message": "You are not authorize", "success": False},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class SearchFriendView(ListAPIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication, SessionAuthentication]

    serializer_class = SearchFriendSerializer

    def get_queryset(self):
        parameter = self.request.query_params.get("q", "")

        if parameter:
            queryset = UserProfile.objects.filter(user__username__icontains=parameter)
            return queryset
        else:
            return UserProfile.objects.all()

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
