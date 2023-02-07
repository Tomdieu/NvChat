from django.contrib import admin

# Importing all the models

from .models import (
    Image,
    ImageMessage,
    Video,
    VideoMessage,
    File,
    Post,
    PostComment,
    PostLike,
    UserProfile,
    ChatGroup,
    CommentLike,
    Notification,
    Message,
    TextMessage,
    GroupMessage,
)


# Register your models here.

admin.site.register(Image)
admin.site.register(ImageMessage)
admin.site.register(Video)
admin.site.register(VideoMessage)
admin.site.register(File)
admin.site.register(Post)
admin.site.register(PostComment)
admin.site.register(PostLike)
admin.site.register(UserProfile)
admin.site.register(ChatGroup)
admin.site.register(CommentLike)
admin.site.register(Notification)
admin.site.register(Message)
admin.site.register(TextMessage)
admin.site.register(GroupMessage)
