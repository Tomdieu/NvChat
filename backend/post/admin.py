from django.contrib import admin

# Register your models here.

from polymorphic.admin import PolymorphicParentModelAdmin, PolymorphicChildModelFilter

from .models import Image, Video, File, Post, Like, PostLike, PostComment, CommentLike,Friends


admin.site.register(Image)
admin.site.register(Video)
admin.site.register(File)


class PostCommentInline(admin.StackedInline):
    model = PostComment
    extra = 0


class PostLikeInline(admin.StackedInline):
    model = PostLike
    extra = 0


class PostAdmin(admin.ModelAdmin):
    inlines = [PostCommentInline, PostLikeInline]


admin.site.register(Post, PostAdmin)


class LikeAdmin(PolymorphicParentModelAdmin):
    base_model = Like
    child_models = (
        PostLike,
        CommentLike,
    )
    list_filter = (PolymorphicChildModelFilter,)

    list_display = ["id", "reaction", "created_at"]


admin.site.register(Like, LikeAdmin)

admin.site.register(CommentLike)
admin.site.register(PostLike)


class CommentLikeInline(admin.StackedInline):
    model = CommentLike
    extra = 0


class PostCommentAdmin(admin.ModelAdmin):
    inlines = [CommentLikeInline]


admin.site.register(PostComment, PostCommentAdmin)


admin.site.register(Friends)