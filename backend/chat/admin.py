from django.contrib import admin

# Importing all the models

from .models import (
    ImageMessage,
    VideoMessage,
    FileMessage,
    InvitationMessage,
    GroupInvitationMessage,
    GroupMember,
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
    child_models = (
        ImageMessage,
        VideoMessage,
        TextMessage,
        FileMessage,
        InvitationMessage,
        GroupInvitationMessage,
    )
    list_filter = (PolymorphicChildModelFilter,)

    list_display = ("id", "created_at")


admin.site.register(IMessage, IMessageAdmin)


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


class ConversationAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at")


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
    list_display = ("id", "chat", "sender", "message")


admin.site.register(GroupMessage, GroupMessageAdmin)


class InvitationMessageAdmin(admin.ModelAdmin):
    list_display = ["sender", "recipient", "status"]


admin.site.register(InvitationMessage, InvitationMessageAdmin)


class GroupInvitationMessageAdmin(admin.ModelAdmin):
    list_display = ["sender", "recipient", "group_chat", "status"]

    raw_id_fields = ["sender", "recipient", "group_chat"]


admin.site.register(GroupInvitationMessage, GroupInvitationMessageAdmin)


class GroupMemberAdmin(admin.ModelAdmin):
    list_display = ["user", "group", "joined_on"]

    raw_id_fields = ["user", "group"]


admin.site.register(GroupMember, GroupMemberAdmin)
