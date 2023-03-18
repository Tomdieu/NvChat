# from django.dispatch import receiver
# from django.db.models.signals import post_save

# from .models import ChatGroup


# @receiver(post_save, sender=ChatGroup)
# def send_chat_update(sender, instance, created, **kwargs):
#     from channels.layers import get_channel_layer
#     import asyncio

#     if not created:
#         channel_layer = get_channel_layer()
#         loop = asyncio.new_event_loop()
#         asyncio.set_event_loop(loop)
#         loop.run_until_complete(
#             channel_layer.group_send(
#                 f"group_chat_{instance.id}",
#                 {
#                     "type": "send_updated_group",
#                     "message": instance,
#                 },
#             )
#         )
