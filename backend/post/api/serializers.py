from rest_framework import serializers

from account.api.serializers import UserProfileSerializer

from post.models import (
    Post,
    PostView,
    PostComment,
    PostLike,
    CommentLike,
    Follower,
    Image,
    Video,
    File,
)
from django.db.models import Q

from chat.api.serializers import IMessagePolymorphicSerializer


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class PostViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostView
        exclude = ["post"]
        # fields = "__all__"


class _PostViewSerializer(serializers.ModelSerializer):
    view_by = UserProfileSerializer()

    class Meta:
        model = PostView
        exclude = ["post"]


class _PostLikeSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()

    class Meta:
        model = PostLike
        fields = "__all__"


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = "__all__"


class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = "__all__"


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = "__all__"


class _CommentLikeSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer(read_only=True)

    class Meta:
        model = CommentLike
        fields = "__all__"


class FollowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follower
        fields = "__all__"


class PostSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True)
    videos = VideoSerializer(many=True)
    files = FileSerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"


class _PostCommentSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()
    replies = serializers.SerializerMethodField()
    content = IMessagePolymorphicSerializer()

    likes = serializers.SerializerMethodField()

    class Meta:
        model = PostComment
        # fields = "__all__"
        exclude = ["parent_comment", "post"]

    def get_replies(self, obj: PostComment):
        print(obj.get_replies())

        serializer = self.__class__(
            obj.get_replies(),
            many=True,
            context=self.context,
        )
        return serializer.data

    def get_likes(self, obj: PostComment):
        return _CommentLikeSerializer(
            CommentLike.objects.filter(comment=obj), many=True, context=self.context
        ).data


class PostListSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer(read_only=True)
    likes = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    views = PostViewSerializer(read_only=True, many=True)
    images = ImageSerializer(read_only=True, many=True)
    videos = VideoSerializer(read_only=True, many=True)
    files = FileSerializer(read_only=True, many=True)
    viewed_by = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = "__all__"

    def get_likes(self, obj: Post):
        try:
            return _PostLikeSerializer(obj.likes.all(), many=True).data
        except:
            return

    def get_comments(self, obj: Post):
        return _PostCommentSerializer(
            PostComment.objects.filter(Q(post=obj) & Q(parent_comment=None)), many=True
        ).data

    def get_viewed_by(self, obj: Post):
        return _PostViewSerializer(obj.views.all()).data
