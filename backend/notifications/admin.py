from django.contrib import admin

from .models import Notification

# Register your models here.


class NotificationAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "message", "is_read", "created_at"]
    list_display_links = ["id", "user"]


admin.site.register(Notification, NotificationAdmin)
