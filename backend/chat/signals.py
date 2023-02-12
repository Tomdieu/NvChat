from django.dispatch import receiver
from django.db.models.signals import post_save, pre_save

from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


from .models import UserProfile, InvitationMessage, Notification

User = get_user_model()


@receiver(post_save, sender=UserProfile)
def create_token(sender, instance, **kwargs):
    userprofile = instance
    Token.objects.create(user=userprofile.user)


@receiver(post_save, sender=InvitationMessage)
def create_notification(sender, instance, created, **kwargs):
    print(instance._meta.label)
    if created:
        msg = f"{instance.sender.user.username} sent you an invitation to become friends"
        Notification.objects.create(user=instance.recipient, message=msg)
