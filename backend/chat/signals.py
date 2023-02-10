from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save

from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


from .models import UserProfile

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if not UserProfile.objects.filter(user=instance).exists():
        UserProfile.objects.create(user=instance)

    if not Token.objects.filter(user=instance).exists():
        Token.objects.create(user=instance)


@receiver(post_save, sender=UserProfile)
def create_token(sender, instance, **kwargs):
    userprofile = instance
    Token.objects.create(user=userprofile.user)
