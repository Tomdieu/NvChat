from django.contrib import admin

# Register your models here.

from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = [
        "user",
        "phone_number",
        "country",
        "profile_picture",
        "bio",
        "online",
    ]
    search_fields = ["user__username", "phone_number", "country", "bio"]
    list_filter = ["country", "online"]


admin.site.register(UserProfile, UserProfileAdmin)
