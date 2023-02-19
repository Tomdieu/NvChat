from rest_framework import serializers

from account.api.serializers import UserProfileSerializer

from post.models import Post,PostComment,PostLike,CommentLike


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        
class _PostLikeSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    class Meta:
        model = PostLike
        fields = '__all__'
        
        
class _PostCommentSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()
    replies = serializers.SerializerMethodField()
    
    class Meta:
        
        model = PostComment
        fields = '__all__'
        
    def get_replies(self, obj):
        if obj.is_parent_comment:
            return _PostCommentSerializer(obj.get_replies(), many=True).data
        return None

class PostListSerializer(serializers.ModelSerializer):
    like = serializers.SerializerMethodField()
    comments = serializers.SerializerMethodField()
    class Meta:
        model = Post
        fields = '__all__'
        
    def get_like(self,obj:Post):
        return _PostLikeSerializer(obj.user_likes.all(),many=True)
    
    def get_comments(self,obj:Post):
        return _PostCommentSerializer(obj.comments.all(),many=True)
        
class PostCommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PostComment
        fields = '__all__'
        
class PostLikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = PostLike
        fields = '__all__'
        
class CommentLikeSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = CommentLike
        fields = '__all__'