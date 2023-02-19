from django.db import models

from account.models import UserProfile
# Create your models here.

class Notification(models.Model):
    """
    Model to represent a notification
    """

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE,related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)