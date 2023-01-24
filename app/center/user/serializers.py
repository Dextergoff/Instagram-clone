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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_active', 'created', 'updated']
        read_only_field = ['is_active', 'created', 'updated']

class LoginSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['user'] = UserSerializer(self.user).data
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)

        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data


class RegisterSerializer(UserSerializer):
    password = serializers.CharField(max_length=128,min_length=8,write_only=True,required=True)
    email = serializers.EmailField(required=True,write_only=True,max_length=128)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'is_active', 'created', 'updated']

    def create(self, validated_data):
        try: 
            user = User.objects.get(email = validated_data['email'])
        except ObjectDoesNotExist:
            user = User.objects.create_user(**validated_data)
        return user

