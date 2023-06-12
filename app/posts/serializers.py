from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from .signals import *
from users.serializers import *
User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    hashtags = serializers.StringRelatedField(many=True, read_only=True,)
    user = UserSerializer(many=False)

    class Meta:
        model = Post
        fields = [
            'pk',
            'user',
            'image',
            'hashtags',
            'likes',
            'title',
            'date',
            'likecount',
        ]


class LikePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'pk',
            'likes',
            'likecount',
        ]


class CreatePostSerializer(serializers.Serializer):
    def parse_title(self):
        for word in self.post.title.split():
            if word[0] == '#':
                Hashtag.objects.get_or_create(title=word[1:])
                hashtag = Hashtag.objects.get(title=word[1:])
                self.post.hashtags.add(hashtag)
                newtitle = self.post.title.replace(word, "")
                self.post.title = newtitle
                self.post.save()

    def create_post(self, data):
        self.user = User.objects.get(pk=data['user'])
        self.post = Post.objects.create(
            user=self.user, image=data['image'],  title=data['title'])
        self.parse_title()
