from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register('login',views.AuthenticationViewSet,basename='login')
router.register('register',views.UserRegistrationViewSet,basename='registration')
router.register('user',views.UserViewSet,basename='user')

urlpatterns = [
]

urlpatterns += router.urls
