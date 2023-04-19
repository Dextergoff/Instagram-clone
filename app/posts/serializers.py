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
User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    hashtags = serializers.StringRelatedField(many=True, read_only=True,)
    images = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'pk',
            'user',
            'desc',
            'image',
            'images',
            'hashtags',
            'likes',
            'username',
            'title',
            'date',
            'likecount',
            'commentcount',
            'page',
        ]


class LikePostSerializer(serializers.Serializer):
    requser = serializers.CharField()
    pk = serializers.CharField()
    likecount = serializers.IntegerField( required=False)
    def count_likes(self, post):
        post.likecount = post.likes.count()

    def proccess_like(self, *args, **kwargs):
        user = kwargs['user']
        post = kwargs['post']
        if user in post.likes.all():
            post.likes.remove(user)
        else:
            post.likes.add(user)
        self.count_likes(post=post)

    def add_like(self, data):
        user = User.objects.get(pk=data['requser'])
        post = Post.objects.get(pk=data['pk'])
        self.proccess_like(post=post, user=user)
        post.save()
        return post

class CreatePostSerializer(serializers.Serializer):

    def create_post(self, data):
        user = User.objects.get(pk=data['user'])
        post = Post.objects.create(user=user, image=data['image'], username=user.username, title=data['title'])
        post_created.send(sender=__class__, post = post)
        # signal recived by create hashtags reciver