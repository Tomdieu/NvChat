from django.db import models

from account.models import UserProfile

from polymorphic.models import PolymorphicModel

from django.core.exceptions import ValidationError

from django.utils.translation import gettext_lazy as _

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
    members = models.ManyToManyField(
        UserProfile, through="GroupMember", blank=True, related_name="group_members"
    )
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
        ChatGroup, on_delete=models.CASCADE, related_name="group_members"
    )
    is_active = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    joined_on = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "group"),)

    def __str__(self) -> str:
        return f"{self.user} in group {self.group}"


class GroupMessage(models.Model):
    """
    Model to represent a group message in a conversation
    """

    chat = models.ForeignKey(
        ChatGroup, related_name="chat_messages", on_delete=models.CASCADE
    )
    parent_message = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="reply_messages",
    )
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.OneToOneField(IMessage, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"Group: {self.chat} Message: {self.message} Sender: {self.sender}"

    def clean_fields(self, exclude=None) -> None:
        super().clean_fields(exclude)

        if not self.chat.members.filter(user=self.sender).exists():
            raise ValidationError(
                {
                    "sender": _(
                        "Sorry this user can not send a message into this chat group because he doesnot belong to that group"
                    )
                }
            )


class GroupMessageView(models.Model):
    viewer = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.ForeignKey(
        GroupMessage, on_delete=models.CASCADE, related_name="viewed"
    )
    viewed_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.message} view by {self.viewer} at {self.viewed_at}"

    def clean_fields(self, exclude=None) -> None:
        super().clean_fields(exclude)
        if not self.message.chat.members.filter(user=self.viewer).exists():
            raise ValidationError(
                {
                    "viewer": _(
                        "!This viewer can view this message because he doest not belong to the group {}".format(
                            self.message.chat
                        )
                    )
                }
            )


class Conversation(models.Model):
    participants = models.ManyToManyField(UserProfile, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self) -> str:
        return f"Conversation {self.id}"

    def clean_fields(self, exclude=None) -> None:
        super().clean_fields(exclude)
        if len(self.participants.all()) > 2:
            raise ValidationError(
                {
                    "participants": _(
                        "Sorry this single chat conversation can only accept 2 people"
                    )
                }
            )


class Message(models.Model):
    conversation = models.ForeignKey(
        Conversation, on_delete=models.CASCADE, related_name="messages"
    )
    sender = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="sender"
    )
    parent_message = models.ForeignKey(
        "self",
        on_delete=models.CASCADE,
        related_name="reply_messages",
        null=True,
        blank=True,
    )
    message = models.ForeignKey(
        IMessage, on_delete=models.CASCADE, related_name="message"
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def clean_fields(self, exclude=None) -> None:
        super().clean_fields(exclude)
        if not self.conversation.participants.filter(user__id=self.sender.id).exists():
            raise ValidationError(_("This user can send message in this single chat"))

    def __str__(self) -> str:
        return f"Message of : {self.sender} in {self.conversation}"
