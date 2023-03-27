from rest_framework.routers import DefaultRouter
from django.urls import path
from . import views

router = DefaultRouter()

router.register("groups", views.ChatGroupViewSet, basename="groups")
router.register(
    "updated-group-image",
    views.UpdatedGroupImageViewSet,
    basename="updated-group-image",
)
router.register(
    "add-group-member", views.AddMemberToGroupViewSet, basename="add-group-member"
)
router.register(
    "remove-group-member",
    views.removeMemberFromGroupViewSet,
    basename="remove-group-member",
)
router.register("join-group", views.JoinGroupViewSet, basename="join-group")
router.register(
    "chat-group-message", views.GroupChatMessageViewSet, basename="chat-group-message"
)
router.register("group-member", views.GroupMemberViewSet, basename="group-member")
router.register("conversation", views.ConversationViewSet, basename="conversations")
router.register("messages", views.MessageViewSet, basename="messages")

urlpatterns = [
    path(
        "send-discussion-message/<int:conversation_id>/",
        views.DisussionMessageApiView.as_view(),
    ),
    path(
        "send-group-message/<int:chat_group_id>/",
        views.GroupMessageApiView.as_view(),
    ),
    path("create-conversation/", views.CreateDiscussionView.as_view()),
]

urlpatterns += router.urls
