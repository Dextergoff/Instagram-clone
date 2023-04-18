from rest_framework import serializers
from posts.models import Post
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
# User=get_user_model()

# class PostSerializer(serializers.ModelSerializer):
#     hashtags = serializers.StringRelatedField(many=True, read_only=True,)
#     images = serializers.StringRelatedField(many=True, read_only=True)

#     class Meta:
#         model = Post
#         fields = [
#             'pk',
#             'user',
#             'desc',
#             'image',
#             'images',
#             'hashtags',
#             'likes',
#             'username',
#             'title',
#             'date',
#             'likecount',
#             'commentcount',
#             'page',
#         ] 

# class CommentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Comment
#         fields = [
#             'pk',
#             'user',
#             'body', 
#            'parent',
#            'likes',
#            'likecount',
#            'username',
#             'replycount',
#             'isreply',
#             'replyingto'

#         ] 
        
# class CommentReplySerializer(serializers.ModelSerializer):

#     class Meta:
#         model = CommentReply
#         fields = [
#             'pk',
#             'user',
#             'body', 
#            'parent_comment',
#            'username',
#         ]         
   
# class LikePostSerializer(serializers.Serializer):
#     requser = serializers.CharField()
#     pk = serializers.CharField()
#     def add_like(self,data): 
#         print(data)
#         user = User.objects.get(pk =data['requser'])
#         post = Post.objects.get(pk = data['pk'])
#         if user in post.likes.all():
#             post.likes.remove(user)
#             post.likecount -= 1
#         else:
#             post.likes.add(user)
#             post.likecount += 1
#         post.save()

# class LikeCommentSerializer(serializers.Serializer):
#     def add_like(self,data): 
#         user = User.objects.get(pk = data['requser'])
#         comment = Comment.objects.get(pk = data['commentpk'])
#         if user in comment.likes.all():
#             comment.likes.remove(user)
#             comment.likecount -= 1
#         else:
#             comment.likes.add(user)
#             comment.likecount += 1
#         comment.save()
#         comment = CommentSerializer(comment)
#         return(comment)

# class CreatePostSerializer(serializers.Serializer):

#     def create_post(self,data):
#         user = User.objects.get(pk=data['user'])
#         username = user.username
#         image = data['image']
#         title = data['title'] 
#         post = Post.objects.create(user=user, image = image, username = username, title=title)
#         for word in title.split():
#             if word[0] == '#':
#                 try:
#                     hashtag = Hashtag.objects.get(title = word[1:])
#                     post.hashtags.add(hashtag)

#                 except:
#                     hashtag = Hashtag.objects.create(title = word[1:])
#                     post.hashtags.add(hashtag)
#                 newtitle = title.replace(word, "")
#                 post.title = newtitle
#                 post.save()
#         print(data)

# class CreateCommentSerializer(serializers.Serializer):
    
#     def create_comment(self,data):
#         print(data)

#         body = data['body']
#         user = User.objects.get(pk = data['user'])
#         parent = data['parent']
#         isreply = data['isreply']
#         comment = Comment.objects.create(username=user.username, parent=parent, user=user, body=body, isreply = isreply)
#         if isreply:
#             try:
#                 parentuser = data['parentuser']

#             except Exception:
#                 parentuser = None
#             parent_comment = Comment.objects.get(pk=parent)
#             comment.replyingto = parentuser
#             parent_comment.replycount += 1
#             parent_comment.save()
#             comment.save()

#         else:
#             parent_post = Post.objects.get(pk=parent)
#             parent_post.commentcount += 1
#             parent_post.save()
#         comment = CommentSerializer(comment)
       
#         response = {
#             # 'commentcount':parent_post.commentcount,
#             # 'parent_post':parent_post.pk,
#             'comment':comment.data
#         }
#         return response

# class CreateCommentReplySerializer(serializers.Serializer):
#     def create(self,data):
#         body = data['body']
#         user = User.objects.get(pk = data['user'])
#         parent_comment = Comment.objects.get(pk = data['parent_comment'])
#         parent_comment.replycount += 1
#         parent_comment.save()
#         reply = CommentReply.objects.create(username=user.username, parent_comment=parent_comment, user=user, body=body)
#         reply = CommentReplySerializer(reply)
#         response = {
#             'parent_comment':parent_comment.pk,
#             'reply':reply.data
#         }
#         return response
