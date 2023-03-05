from django.urls import path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register("friends", views.FriendListViewSet, basename="friends")
router.register("friend-request", views.FriendRequestViewSet, basename="friend-request")


urlpatterns = [
    path("send-friend-request", views.SendFriendRequestView.as_view()),
    path("accept-friend-request/<pk>/", views.AcceptFriendRequestView.as_view()),
    path("decline-friend-request/<pk>/", views.DenyFriendRequestView.as_view()),
    path("cancel-friend-request/<pk>/", views.CancelFriendRequestView.as_view()),
    path("search/", views.SearchFriendView.as_view()),
]

urlpatterns += router.urls
