from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("authenticate",views.AuthenticationViewSet,basename="authenticate")
router.register('users',views.UserViewSet,basename="users")
router.register("groups",views.ChatGroupViewSet,basename="groups")
router.register("chat-group-message",views.GroupChatMessageViewSet,basename="chat-group-message")
router.register("chat-group-members",views.GroupChatMembersViewSet,basename="chat-group-members")
router.register("groups-message",views.GroupMessageViewSet,basename="groups-message")
router.register("messages",views.MessageViewSet,basename="messages")
router.register("posts",viewset=views.PostViewSet,basename="posts")
router.register("notifications",viewset=views.NotificationViewSet,basename="notifications")
router.register("friends",views.FriendViewSet,basename="friends")
router.register("group-members",views.ChatGroupMembersViewSet,basename="group-members")

urlpatterns = []

urlpatterns += router.urls