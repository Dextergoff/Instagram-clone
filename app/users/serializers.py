from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.response import Response
import jwt
import uuid
from center import settings
from .views import *
from django.dispatch import receiver
from .signals import *
User = get_user_model()


class VerifyResetSerializer(serializers.Serializer):
    uid = serializers.CharField()

    def verify(self, data):
        try:
            uid = data['uid']
            User.objects.get(resetkey=uid)
            return uid
        except:
            raise exceptions.ValidationError(('Cannot verify uid'))


class ResetPasswordSerializer(serializers.Serializer):
    newpassword = serializers.CharField()
    token = serializers.CharField()

    def validate_password(data):
        Validation.validate_password(data=data)
        return data

    def update(self, data):
        newpassword_validated.send(sender=self.__class__, data=data)
        return data


class ForgotSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, data):
        Validation.validate_email(data=data)
        return data

    def send_email(self, data):
        return (Mail.send_email(data=data))


class UserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def validate_password(self, data):
        Validation.validate_password(data=data)
        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['pk', 'username', 'email', 'description', 'pfp']
