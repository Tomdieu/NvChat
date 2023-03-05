from django.contrib import admin

from .models import FriendList, FriendRequest

# Register your models here.


class FriendListAdmin(admin.ModelAdmin):
    list_display = ["id", "user"]
    search_fields = ["user__username"]


admin.site.register(FriendList, FriendListAdmin)


class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ["id", "sender", "reciever"]

    search_fields = ["sender__username", "reciever__username"]


admin.site.register(FriendRequest, FriendRequestAdmin)
