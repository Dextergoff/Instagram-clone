from rest_framework import serializers
from feed.models import Post
from cart.models import Cart
from center.user.models import User
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
from center.decorators import cart_required
from django.shortcuts import get_object_or_404
from feed.models import Post
from .serializers import *
from cart.models import *

class PostSerializer(serializers.ModelSerializer):
    hashtags = serializers.StringRelatedField(many=True, read_only=True,)
    likes = serializers.StringRelatedField(many=True, read_only=True)
    images = serializers.StringRelatedField(many=True, read_only=True)
    comments = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Post
        fields = [
            'pk',
            'user',
            'price',
            'desc',
            'image',
            'images',
            'hashtags',
            'likes',
            'comments',
        ] 

class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = [
            'items',
            'user',
            'total',
            'paid',
            'date',
            'objects',
        ]
