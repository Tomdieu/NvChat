from chat.models import (
    IMessage,
    ImageMessage,
    VideoMessage,
    TextMessage,
    FileMessage,
    Message,
    Post,
    PostComment,
    PostLike,
    Video,
    File,
    Image,
    ChatGroup,
    GroupMessage,
    CommentLike,
    Notification,
    UserProfile,
)

from rest_framework import serializers
from rest_polymorphic.serializers import PolymorphicSerializer

from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "is_superuser",
            "is_staff",
        ]
        
        extra_kwargs = {
            'password':{
                'write_only':True
            }
        }


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    class Meta:
        model = UserProfile
        fields = "__all__"


class ImessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = IMessage
        fields = '__all__'


class ImageMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageMessage
        fields = "__all__"


class VideoMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMessage
        fields = "__all__"


class TextMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = TextMessage
        fields = "__all__"


class FileMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileMessage
        fields = "__all__"


class IMessagePolymorphicSerializer(PolymorphicSerializer):
    model_serializer_mapping = {
        ImageMessage: ImageMessageSerializer,
        VideoMessage: VideoMessageSerializer,
        TextMessage: TextMessageSerializer,
        FileMessage: FileMessageSerializer,
    }


class MessageSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer(many=False)
    class Meta:
        model = Message
        fields = "__all__"


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = "__all__"


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"



class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        
class PostListSerializer(serializers.ModelSerializer):
    author = UserProfileSerializer()
    images = ImageSerializer()
    files = FileSerializer()
    video = VideoSerializer()
    
    class Meta:
        model = Post
        fields = "__all__"


class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = "__all__"


class PostCommentListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    post = PostCommentSerializer()
    class Meta:
        model = PostComment
        fields = '__all__'

class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = "__all__"


class ChatGroupSerializer(serializers.ModelSerializer):
    # participant = UserProfileSerializer(many=True)
    class Meta:
        model = ChatGroup
        fields = "__all__"


class GroupMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupMessage
        fields = "__all__"

class GroupMessageListSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer()
    sender = UserProfileSerializer()
    chat = ChatGroupSerializer()
    class Meta:
        model = GroupMessage
        fields = "__all__"
        
class GroupMessageCreateSerializer(serializers.ModelSerializer):
    message = IMessagePolymorphicSerializer()
    class Meta:
        model = GroupMessage
        fields = "__all__"


class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"

class NotificationListSerializer(serializers.ModelSerializer):
    user = UserProfileSerializer()
    class Meta:
        model = Notification
        fields = "__all__"
