from django.db import models

# Create your models here.

from django.contrib.auth import get_user_model

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone_number = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)
    bio = models.CharField(max_length=255, null=True, blank=True)
    online = models.BooleanField(default=False)

    def __str__(self) -> str:
        return f"{self.user}"
