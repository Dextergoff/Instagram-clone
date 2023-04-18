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
User=get_user_model()

class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = [
            'pk',
            'user',
            'body', 
           'parent',
           'likes',
           'likecount',
           'username',
            'replycount',
            'isreply',
            'replyingto'

        ] 

 
class LikeCommentSerializer(serializers.Serializer):
    
    def count_likes(self,comment):
        comment.likecount = comment.likes.count()

    def proccess_like(self, *args, **kwargs):
        user = kwargs['user']
        comment = kwargs['comment']
        if user in comment.likes.all():
            comment.likes.remove(user)
        else:
            comment.likes.add(user)
        self.count_likes(comment=comment)

    def add_like(self, data):
        user = User.objects.get(pk=data['user'])
        comment = Comment.objects.get(pk=data['pk'])
        self.proccess_like(comment=comment, user=user)
        comment.save()

class CreateCommentSerializer(serializers.Serializer):

    def serialize_comment(self, comment):
        comment = CommentSerializer(comment)
        response = {
            'comment':comment.data
        }
        return response

    def get_replying_to(self, data):
        try:
            replyingto = data['replyingto']
        except:
            replyingto = None
        return replyingto

    def update_parent(self, parent):
        comment = Comment.objects.get(pk=parent)
        comment.replycount += 1
        comment.save()

    def create_reply(self, data):
        user = User.objects.get(pk = data['user'])
        replyingto = self.get_replying_to(data)
        comment = Comment.objects.create(username=user.username, parent=data['parent'], user=user, body=data['body'], isreply = True, replyingto=replyingto)
        self.update_parent(data['parent'])
        return self.serialize_comment(comment=comment) 

    def create_comment(self, data):
        user = User.objects.get(pk = data['user'])
        comment = Comment.objects.create(username=user.username, parent=data['parent'], user=user, body=data['body'], isreply = False)
        return self.serialize_comment(comment=comment) 

    def handle_comment(self,data):
        isreply = data['isreply']
        if isreply:
            comment = self.create_reply(data=data)
        else:
            comment = self.create_comment(data=data)
        return comment
        