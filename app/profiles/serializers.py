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
from posts.models import *
from .serializers import *
from users.serializers import *
User = get_user_model()


class GalleryPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'pk',
            'user',
            'image',
        ]
