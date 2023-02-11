from django.db import models

from django.contrib.auth import get_user_model

from polymorphic.models import PolymorphicModel

# Create your models here.

User = get_user_model()


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,related_name="profile")
    profile_picture = models.ImageField(upload_to="profiles/", null=True, blank=True)
    bio = models.CharField(max_length=255,null=True,blank=True)

    def __str__(self) -> str:
        return f"{self.user}"

class IMessage(PolymorphicModel):
    """
    Define an interface for a message with a single responsibility
    """

    # TYPES = (("TEXT", "TEXT"), ("IMAGE", "IMAGE"), ("VIDEO", "VIDEO"), ("FILE", "FILE"))

    # message_type = models.CharField(max_length=20,choices=TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self) -> str:
        return self.message_type



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
    
    def __str__(self) -> str:
        return self.file.name
    
class UrlMessage(IMessage):
    url = models.URLField()
    
    def __str__(self) -> str:
        return self.url
    
class InvitationMessage(IMessage):
    sender = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name="send_invitation")
    recipient  = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name="received_invitations")
    status = models.CharField(max_length=10,default='pending',choices=[('pending','pending'),('accepted','rejected'),('rejected','accepted')])
    
    class Meta:
        unique_together = (('sender','recipient'),)
    
class GroupInvitationMessage(InvitationMessage):
    group_chat = models.ForeignKey("ChatGroup",on_delete=models.CASCADE,related_name="invitations")
    
class ChatGroup(models.Model):
    """
    Model to represent a group
    """

    chat_name = models.CharField(max_length=255)
    created_by = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name="created_by")
    participant = models.ManyToManyField(UserProfile,blank=True)

    def __str__(self) -> str:
        return self.chat_name

class ChatGroupMembers(models.Model):
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name="user_groups")
    group = models.ForeignKey(ChatGroup,on_delete=models.CASCADE,related_name="groups")
    joined_on = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = (('user', 'group'),)

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
        IMessage, on_delete=models.CASCADE, related_name="message"
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
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE, related_name="author")
    text = models.TextField(blank=True, null=True)
    images = models.ManyToManyField(Image, blank=True)
    files = models.ManyToManyField(File, blank=True)
    video = models.ManyToManyField(Video, blank=True)


class PostLike(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="user_liking"
    )
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)


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

class Friends(models.Model):
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name="users")
    friend = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name='friends')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = (("user", "friend"),)


class Notification(models.Model):
    """
    Model to represent a notification
    """

    user = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

