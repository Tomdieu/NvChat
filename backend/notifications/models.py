from django.db import models

from account.models import UserProfile

from django.dispatch import receiver
from django.db.models.signals import post_save

# Create your models here.


class Notification(models.Model):
    """
    Model to represent a notification
    """

    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)


@receiver(post_save, sender=Notification)
def send_user_notification(sender, instance, created, **kwargs):
    """
    Notification Post Save Signal
    """
    from .api.serializer import NotificationSerializer
    import json

    if created:
        notification = NotificationSerializer(instance)

        try:
            from channels.layers import get_channel_layer

            # from asgiref.sync import async_to_sync
            import asyncio

            channel_layer = get_channel_layer()
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)
            loop.run_until_complete(
                channel_layer.group_send(
                    f"notification_{instance.user.id}",
                    {
                        "type": "send_notification",
                        "message": json.dumps(notification.data),
                    },
                )
            )
        except:
            pass
