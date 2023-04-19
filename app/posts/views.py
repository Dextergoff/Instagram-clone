from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from .models import Post
from .serializers import *
from center.modules.actions.queryactions import pageify
from center.settings import PAGEIFY, QUERYING
class LikePost(viewsets.ViewSet):
    def like(self, request):
        serializer = LikePostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.add_like(data=request.data)
            post = Post.objects.get(pk=request.data['pk'])
            serializer = PostSerializer(post)
            return Response(serializer.data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        # likes are slow on windows machine ??

class PostsView(viewsets.ViewSet):
    serializer = PostSerializer

    def main(self, request, pk):
        queryset = Post.objects.get(pk=pk)
        serializer = PostSerializer(queryset)
        return Response(serializer.data)

class PageView(viewsets.ViewSet):
    serializer = PostSerializer

    def main(self, request, page):
        queryset = Post.objects.all().order_by("-date").filter()
        queryset = pageify(queryset=queryset, page=page, items_per_page=5)
        serializer = PostSerializer(queryset[PAGEIFY['QUERYSET_KEY']], many=True)
        response = {
            QUERYING['ND_KEY']: {QUERYING['PAGE_KEY']: [page], QUERYING['DATA_KEY']: serializer.data},
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']]
        }
        return Response(response)

class CreatePostView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.create_post(data=request.data)
            return Response(data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)