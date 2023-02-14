from django.contrib import admin

# Importing all the models

from .models import (
    Image,
    ImageMessage,
    VideoMessage,
    FileMessage,
    InvitationMessage,
    GroupInvitationMessage,
    UrlMessage,
    Video,
    File,
    Post,
    PostComment,
    PostLike,
    UserProfile,
    ChatGroup,
    ChatGroupMembers,
    Friends,
    CommentLike,
    Notification,
    Conversation,
    Message,
    TextMessage,
    GroupMessage,
    IMessage,
)
from polymorphic.admin import (
    PolymorphicParentModelAdmin,
    PolymorphicChildModelAdmin,
    PolymorphicChildModelFilter,
)

# Register your models here.


class ModelIMessageAdmin(PolymorphicChildModelAdmin):
    base_model = IMessage


class IMessageAdmin(PolymorphicParentModelAdmin):
    base_model = IMessage
    child_models = (ImageMessage, VideoMessage, TextMessage, FileMessage,UrlMessage,InvitationMessage,GroupInvitationMessage)
    list_filter = (PolymorphicChildModelFilter,)

    list_display = ("id", "created_at")


admin.site.register(IMessage, IMessageAdmin)


class ImageAdmin(admin.ModelAdmin):
    list_display = ("image",)


admin.site.register(Image, ImageAdmin)


class VideoAdmin(admin.ModelAdmin):
    list_display = ("id", "video")


admin.site.register(Video, VideoAdmin)


class FileAdmin(admin.ModelAdmin):
    list_display = ("id", "file")


admin.site.register(File, FileAdmin)


class PostAdmin(admin.ModelAdmin):
    list_display = ("id", "author")


admin.site.register(Post, PostAdmin)


class ImageMessageAdmin(admin.ModelAdmin):
    list_display = ("caption", "created_at")


admin.site.register(ImageMessage, ImageMessageAdmin)


class VideoMessageAdmin(admin.ModelAdmin):
    list_display = ("caption", "created_at")


admin.site.register(VideoMessage)


class FileMessageAdmin(admin.ModelAdmin):
    list_display = ("caption", "created_at")
    list_filter = ("file",)


admin.site.register(FileMessage, FileMessageAdmin)


class TextMessageAdmin(admin.ModelAdmin):
    list_display = ("text", "created_at")


admin.site.register(TextMessage, TextMessageAdmin)


class PostCommentAdmin(admin.ModelAdmin):
    list_display = ("id", "post", "text", "created_at")


admin.site.register(PostComment, PostCommentAdmin)
admin.site.register(PostLike)
admin.site.register(ChatGroup)
admin.site.register(CommentLike)


class NotificationAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "message", "is_read", "created_at")
    raw_id_fields = ["user"]


admin.site.register(Notification, NotificationAdmin)

class ConversationAdmin(admin.ModelAdmin):
    
    list_display = ("id","created_at")
    
admin.site.register(Conversation, ConversationAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "sender",
        "is_read",
        "timestamp",
    )
    raw_id_fields = ["sender"]


admin.site.register(Message, MessageAdmin)

class GroupMessageAdmin(admin.ModelAdmin):
    list_display = ('id',"chat","sender","message")
    
admin.site.register(GroupMessage,GroupMessageAdmin)


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ("id", "user", 'country','phone_number',"bio")

    raw_id_fields = ["user"]


admin.site.register(UserProfile, UserProfileAdmin)

class InvitationMessageAdmin(admin.ModelAdmin):
    
    list_display = ['sender','recipient','status']
    
admin.site.register(InvitationMessage,InvitationMessageAdmin)

class GroupInvitationMessageAdmin(admin.ModelAdmin):
    
    list_display = ['sender','recipient','group_chat','status']
    
    raw_id_fields = ['sender',"recipient","group_chat"]
    
admin.site.register(GroupInvitationMessage,GroupInvitationMessageAdmin)

class UrlMessageAdmin(admin.ModelAdmin):
    
    list_display = ['url','created_at']

admin.site.register(UrlMessage, UrlMessageAdmin)

class ChatGroupMembersAdmin(admin.ModelAdmin):
    
    list_display = ['user','group','joined_on']
    
    raw_id_fields = ['user','group']
    
admin.site.register(ChatGroupMembers, ChatGroupMembersAdmin)

class FriendsAdmin(admin.ModelAdmin):
    
    list_display = ['user','friend','created_at']
    
    raw_id_fields = ['user','friend']
    
admin.site.register(Friends,FriendsAdmin)