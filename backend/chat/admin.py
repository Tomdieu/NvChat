from django.contrib import admin

# Importing all the models

from .models import (
    ImageMessage,
    VideoMessage,
    FileMessage,
    InvitationMessage,
    GroupInvitationMessage,
    ChatGroup,
    GroupMember,
    GroupMessageView,
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

# from nested_admin import NestedModelAdmin, NestedStackedInline, NestedInlineModelAdmin
from nested_admin import nested

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
    list_display = ("id", "caption", "created_at")


admin.site.register(ImageMessage, ImageMessageAdmin)


class VideoMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "caption", "created_at")


admin.site.register(VideoMessage)


class FileMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "caption", "created_at")
    list_filter = ("file",)


admin.site.register(FileMessage, FileMessageAdmin)


class TextMessageAdmin(admin.ModelAdmin):
    list_display = ("text", "created_at")


admin.site.register(TextMessage, TextMessageAdmin)


class MessageAdminInline(admin.TabularInline):
    model = Message
    extra = 0
    raw_id_fields = ["sender"]


class ConversationAdmin(admin.ModelAdmin):
    list_display = ("id", "created_at")
    inlines = [MessageAdminInline]


admin.site.register(Conversation, ConversationAdmin)


# class MessageAdmin(admin.ModelAdmin):
#     list_display = (
#         "id",
#         "sender",
#         "is_read",
#         "timestamp",
#     )
#     raw_id_fields = ["sender"]


# admin.site.register(Message, MessageAdmin)


class GroupMessageViewAdminInline(admin.TabularInline, nested.NestedTabularInline):
    model = GroupMessageView
    extra = 0


class GroupMessageAdminInline(admin.TabularInline, nested.NestedTabularInline):
    model = GroupMessage
    extra = 0
    raw_id_fields = ["sender", "message", "parent_message"]
    inlines = [GroupMessageViewAdminInline]


class GroupMemberAdminInline(admin.TabularInline, nested.NestedTabularInline):
    model = GroupMember
    extra = 0


class ChatGroupAdmin(nested.NestedModelAdmin):
    list_display = ("chat_name", "description", "created_by", "updated_on")
    inlines = [GroupMemberAdminInline, GroupMessageAdminInline]


admin.site.register(ChatGroup, ChatGroupAdmin)


class GroupMessageAdmin(admin.ModelAdmin):
    list_display = ("id", "chat", "sender", "parent_message", "message")
    inlines = [GroupMessageViewAdminInline]


# admin.site.register(GroupMessage, GroupMessageAdmin)

# admin.site.register(GroupMessageView)


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
