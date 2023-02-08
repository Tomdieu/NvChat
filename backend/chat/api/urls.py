from django.urls import path

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('users',views.UserViewSet,basename="users")
router.register("groups",views.ChatGroupViewSet,basename="groups")
router.register("groups-message",views.GroupMessageViewSet,basename="groups-message")
router.register("messages",views.MessageViewSet,basename="messages")

urlpatterns = []

urlpatterns += router.urls