from django.db.models.signals import post_save

from django.dispatch import receiver

from django.contrib.auth import get_user_model

from rest_framework.authtoken.models import Token

User = get_user_model()

@receiver(post_save,sender=User)
def create_user_token(sender,instance,created,**kwargs):
    if created:
        Token.objects.create(user=instance)
        
