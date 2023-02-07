from django.db import models

from django.contrib.auth import get_user_model

from polymorphic.models import PolymorphicModel

# Create your models here.

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.user}"

class IMessage(PolymorphicModel):
    """
    Define an interface for a message with a single responsibility
    """

    TYPES = (("TEXT", "TEXT"), ("IMAGE", "IMAGE"), ("VIDEO", "VIDEO"), ("FILE", "FILE"))

    message_type = models.CharField(max_length=20,choices=TYPES)
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

    image = models.ImageField(upload_to="images/")
    caption = models.TextField(blank=True, null=True)


class VideoMessage(IMessage):
    """
    A concrete implementation of the message interface for video messages
    """

    video = models.FileField(upload_to="videos/")
    caption = models.TextField(blank=True, null=True)

class FileMessage(IMessage):
    """
    A concrete implementation of the message interface for video messages
    """

    file = models.FileField(upload_to="files/")
    caption = models.TextField(blank=True, null=True)

class ChatGroup(models.Model):
    """
    Model to represent a group
    """

    chat_name = models.CharField(max_length=255)
    participant = models.ManyToManyField(UserProfile,blank=True)

    def __str__(self) -> str:
        return self.chat_name


class GroupMessage(models.Model):
    """
    Model to represent a group message in a conversation
    """

    chat = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)
    sender = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.OneToOneField(IMessage, on_delete=models.CASCADE)


class Message(models.Model):
    sender = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="sender"
    )
    reciever = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="reciever"
    )
    message = models.ForeignKey(
        ImageMessage, on_delete=models.CASCADE, related_name="message"
    )
    timestamp = models.DateTimeField(auto_now_add=True)
    sender_read = models.BooleanField(default=False)
    reciever_read = models.BooleanField(default=False)

    class Meta:
        unique_together = (("sender", "reciever"),)


class Image(models.Model):
    image = models.ImageField(upload_to="post/images/")

    def __str__(self) -> str:
        return self.image.name


class Video(models.Model):
    video = models.FileField(upload_to="post/videos/")

    def __str__(self) -> str:
        return self.video.name


class File(models.Model):
    file = models.FileField(upload_to="post/files/")

    def __str__(self) -> str:
        return self.file.name


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    text = models.TextField(blank=True, null=True)
    images = models.ManyToManyField(Image, blank=True)
    files = models.ManyToManyField(File, blank=True)
    video = models.ManyToManyField(Video, blank=True)


class PostLike(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="user_liking"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class PostComment(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="user_commenting"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="post")
    text = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)


class CommentLike(models.Model):
    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    comment = models.ForeignKey(PostComment, on_delete=models.CASCADE)


class Notification(models.Model):
    """
    Model to represent a notification
    """

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
