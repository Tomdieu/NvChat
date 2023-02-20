from django.db import models

from account.models import UserProfile

from polymorphic.models import PolymorphicModel

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


class Post(models.Model):
    author = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="posts"
    )
    title = models.CharField(max_length=255)
    content = models.TextField(null=True, blank=True)
    published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    images = models.ManyToManyField(Image, blank=True)
    files = models.ManyToManyField(File, blank=True)
    video = models.ManyToManyField(Video, blank=True)


class Like(PolymorphicModel):
    user = models.ForeignKey(
        UserProfile, on_delete=models.CASCADE, related_name="user_likes"
    )
    reaction = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class PostLike(Like):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="likes")


class PostComment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name="comments")
    parent_comment = models.ForeignKey(
        "self", on_delete=models.CASCADE, null=True, blank=True, related_name="replies"
    )
    author = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.author} - {self.content[:50]}"

    @property
    def is_parent_comment(self):
        return self.parent_comment is None

    def get_replies(self):
        return PostComment.objects.filter(parent_comment=self)


class CommentLike(Like):
    comment = models.ForeignKey(
        PostComment, on_delete=models.CASCADE, related_name="comment_like"
    )

class Follower(models.Model):
    user = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name="users")
    friend = models.ForeignKey(UserProfile,on_delete=models.CASCADE,related_name='friends')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        unique_together = (("user", "friend"),)