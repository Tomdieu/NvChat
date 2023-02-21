from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register("groups",views.ChatGroupViewSet,basename="groups")
router.register("join-group",views.JoinGroupViewSet,basename="join-group")
router.register("chat-group-message",views.GroupChatMessageViewSet,basename="chat-group-message")
router.register("conversation",views.ConversationViewSet,basename="conversations")
router.register("messages",views.MessageViewSet,basename="messages")

urlpatterns = []

urlpatterns += router.urls