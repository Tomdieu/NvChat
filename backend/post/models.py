from django.db import models

from account.models import UserProfile

from polymorphic.models import PolymorphicModel

from chat.models import IMessage

# Create your models here.


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


class Location(models.Model):
    lat = models.DecimalField(decimal_places=6, max_digits=9)
    lng = models.DecimalField(decimal_places=6, max_digits=9)

    def __str__(self) -> str:
        return f"[{self.lat},{self.lng}]"


class Post(models.Model):
    author = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="posts"
    )
    content = models.TextField(null=True, blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    images = models.ManyToManyField(Image, blank=True)
    files = models.ManyToManyField(File, blank=True)
    videos = models.ManyToManyField(Video, blank=True)

    is_comment_able = models.BooleanField(default=True)

    views = models.ManyToManyField(
        UserProfile, through="PostView", blank=True, related_name="view_by"
    )

    def __str__(self) -> str:
        return f"{self.author} Post"


class PostView(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    view_by = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f"{self.view_by} view {self.post}"


class Like(PolymorphicModel):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="user_likes"
    )
    reaction = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return f"{self.user}"


class PostLike(Like):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")

    def __str__(self) -> str:
        return f"{self.user} Liked {self.post}"


class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    parent_comment = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    content = models.ForeignKey(IMessage, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.author} - {self.content}"

    @property
    def is_parent_comment(self):
        return self.parent_comment is None

    def get_replies(self):
        return PostComment.objects.filter(parent_comment__id=self.id)


class CommentLike(Like):
    comment = models.ForeignKey(
        PostComment, on_delete=models.CASCADE, related_name="comment_like"
    )

    def __str__(self) -> str:
        return f"{self.user} Comment"


class Follower(models.Model):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="follower"
    )
    followers = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="my_followers"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = (("user", "followers"),)
