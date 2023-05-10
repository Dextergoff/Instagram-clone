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
from posts.models import *
from users.serializers import UserSerializer
User = get_user_model()


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False)

    class Meta:
        model = Comment
        fields = [
            'pk',
            'user',
            'body',
            'post',
            'parent',
            'likes',
            'likecount',
            'children',
            'to'

        ]


class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = [
            'pk',
            'likes',
            'likecount',
        ]


class CreateCommentSerializer(serializers.Serializer):

    def serialize_comment(self, comment):
        comment = CommentSerializer(comment)
        response = {
            'comment': comment.data
        }
        return response

    def update_parent(self, parent):

        try:
            comment = Comment.objects.get(pk=parent)
            comment.children += 1
            comment.save()
        except Exception:
            pass

    def create_comment(self, data, user):
        parent = data['parent']
        post = data['post']
        to = data['to']
        comment = Comment.objects.select_related().create(
            parent=parent['pk'], user=user, body=data['body'], post=post, to=to)
        self.update_parent(parent['pk'])
        return self.serialize_comment(comment=comment)

    def handle_comment(self, data):
        user = User.objects.select_related().get(pk=data['user'])
        comment = self.create_comment(data=data, user=user)
        return comment


1
