from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("", views.PostViewSet, basename="posts")


urlpatterns = []

urlpatterns += router.urls
