from django.db import models

from account.models import UserProfile

from polymorphic.models import PolymorphicModel

# Create your models here.


class IMessage(PolymorphicModel):
    """
    Define an interface for a message with a single responsibility
    """

    created_at = models.DateTimeField(auto_now_add=True)


class TextMessage(IMessage):
    """
    A concrete implementation of the message interface for text messages
    """

    text = models.TextField()

    def __str__(self) -> str:
        return self.text


class ImageMessage(IMessage):
    """
    A concrete implementation of the message interface for image messages
    """

    image = models.ImageField(upload_to="chat/images/")
    caption = models.TextField(blank=True, null=True)


class VideoMessage(IMessage):
    """
    A concrete implementation of the message interface for video messages
    """

    video = models.FileField(upload_to="chat/videos/")
    caption = models.TextField(blank=True, null=True)


class FileMessage(IMessage):
    """
    A concrete implementation of the message interface for video messages
    """

    file = models.FileField(upload_to="chat/files/")
    caption = models.TextField(blank=True, null=True)

    def __str__(self) -> str:
        return self.file.name


class InvitationMessage(IMessage):
    sender = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="send_invitation"
    )
    recipient = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="received_invitations"
    )
    status = models.CharField(
        max_length=10,
        default="pending",
        choices=[
            ("pending", "pending"),
            ("accepted", "rejected"),
            ("rejected", "accepted"),
        ],
    )

    class Meta:
        unique_together = (("sender", "recipient"),)


class GroupInvitationMessage(InvitationMessage):
    group_chat = models.ForeignKey(
        "ChatGroup", on_delete=models.CASCADE, related_name="invitations"
    )


class ChatGroup(models.Model):
    """
    Model to represent a group
    """

    chat_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="created_by"
    )
    members = models.ManyToManyField(UserProfile, through="GroupMember", blank=True)
    image = models.ImageField(upload_to="group_image/", blank=True, null=True)

    @property
    def messages(self) -> list:
        return self.chat_messages.all()

    def __str__(self) -> str:
        return self.chat_name


class GroupMember(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="user_groups"
    )
    group = models.ForeignKey(
        ChatGroup, on_delete=models.CASCADE, related_name="groups"
    )
    is_active = models.BooleanField(default=False)
    joined_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "group"),)


class GroupMessage(models.Model):
    """
    Model to represent a group message in a conversation
    """

    chat = models.ForeignKey(
        ChatGroup, related_name="chat_messages", on_delete=models.CASCADE
    )
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.OneToOneField(IMessage, on_delete=models.CASCADE)


class Conversation(models.Model):
    participants = models.ManyToManyField(UserProfile)
    created_at = models.DateTimeField(auto_now_add=True, null=True)


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="sender"
    )
    message = models.ForeignKey(
        IMessage, on_delete=models.CASCADE, related_name="message"
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
