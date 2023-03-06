from django.urls import path, include


urlpatterns = [path("", include("notifications.api.urls"))]
