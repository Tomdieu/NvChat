from rest_framework.response import Response

from rest_framework.mixins import (
    CreateModelMixin,
    ListModelMixin,
    UpdateModelMixin,
    DestroyModelMixin,
    RetrieveModelMixin,
)

from rest_framework.viewsets import GenericViewSet

from rest_framework.permissions import IsAuthenticated

from rest_framework.authentication import TokenAuthentication, SessionAuthentication

from rest_framework.parsers import FormParser, MultiPartParser

from rest_framework.views import APIView

from ..models import Post, PostComment, PostLike, PostView

from .serializers import PostSerializer, PostListSerializer, PostViewSerializer


class PostViewSet(
    CreateModelMixin,
    RetrieveModelMixin,
    UpdateModelMixin,
    ListModelMixin,
    DestroyModelMixin,
    GenericViewSet,
):
    permission_classes = [IsAuthenticated]

    authentication_classes = [TokenAuthentication, SessionAuthentication]

    parser_classes = [FormParser, MultiPartParser]

    def get_serializer_class(self):
        if self.request.method in ["GET"]:
            return PostListSerializer
        return PostSerializer

    def get_queryset(self):
        return Post.objects.all()


class PostCommentView(APIView):
    """
    This represent the post comment view where we can add a post comment
    """

    def post(self, request, *args, **kwargs):
        pass


class LikePostView(APIView):
    """
    This represent the post like view where a post can be like
    """

    def post(self, request, *args, **kwargs):
        pass


class ViewPostView(APIView):
    """
    This represent the post views where we can identify who viewed a post
    """

    def post(self, request, *args, **kwargs):
        pass
