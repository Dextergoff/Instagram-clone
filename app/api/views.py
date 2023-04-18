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
from .serializers import *
from .actions import pageify


# class PostsView(viewsets.ViewSet):
#     serializer = PostSerializer

#     def main(self, request, pk):
#         queryset = Post.objects.get(pk=pk)
#         serializer = PostSerializer(queryset)
#         return Response(serializer.data)

#     def likepost(self, request):
#         serializer = LikePostSerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         serializer.add_like(data=request.data)
#         queryset = Post.objects.get(pk=request.data['pk'])
#         serializer = PostSerializer(queryset)
#         return Response(serializer.data)

#     def unlike(self, request, pk=None):
#         post = Post.objects.get(pk=pk)
#         post.likes.remove(request.user)
#         post.save()


# class ProfilePosts(viewsets.ViewSet):
#     serializer = PostSerializer

#     def main(self, request, pk, page):
#         arrsplit2 = 5 * page
#         arrsplit = arrsplit2 - 5
#         end_of_posts = False
#         queryset = Post.objects.filter(user=pk).order_by("-date")
#         post_count = queryset.count()
#         querysetpage = queryset[arrsplit:arrsplit2].filter()
#         serializer = PostSerializer(querysetpage, many=True)
#         if queryset.count() < 5:
#             end_of_posts = True
#         response = {
#             "page_data": {"pages": [page], "posts": serializer.data},
#             "end_of_posts": end_of_posts,
#             "post_count": post_count
#         }
#         return Response(response)


# class HashtagView(viewsets.ViewSet):
#     def main(self, request, hashtag, page):
#         end_of_posts = False
#         hashtag = Hashtag.objects.get(title=hashtag)
#         queryset = Post.objects.filter(hashtags=hashtag).order_by("-date")
#         post_count = queryset.count()
#         queryset = pageify(queryset=queryset, page=page, items_per_page=5)
#         serializer = PostSerializer(queryset, many=True)
#         if queryset.count() < 5:
#             end_of_posts = True
#         response = {
#             "page_data": {"pages": [page], "posts": serializer.data},
#             "end_of_posts": end_of_posts,
#             "post_count": post_count
#         }
#         return Response(response)


# class PageView(viewsets.ViewSet):
#     serializer = PostSerializer

#     def main(self, request, page):
#         end_of_posts = False
#         queryset = Post.objects.all().order_by("-date").filter()
#         queryset = pageify(queryset=queryset, page=page, items_per_page=5)
#         if queryset.count() < 5:
#             end_of_posts = True
#         serializer = PostSerializer(queryset, many=True)
#         response = {
#             "page_data": {"pages": [page], "posts": serializer.data},
#             "end_of_posts": end_of_posts
#         }
#         return Response(response)


# class CommentsView(viewsets.ViewSet):
#     def getcomments(self, request, pk, page):

#         queryset = Comment.objects.filter(
#             parent=pk).order_by("-date").filter()
#         queryset = pageify(queryset=queryset, page=page, items_per_page=50)

#         end_of_comments = False
#         if queryset.count() < 50:
#             end_of_comments = True
#         serializer = CommentSerializer(queryset, many=True)
#         response = {
#             "page": page,
#             "comments": serializer.data,
#             "parent_post": int(pk),
#             "end_of_comments": end_of_comments
#         }
#         return Response(response)

#     def getreplys(self,request,pk,page):
#         queryset = Comment.objects.filter(
#             parent=pk, isreply=True).order_by("replyingto").filter()
#         queryset = pageify(queryset=queryset, page=page, items_per_page=50)

#         end_of_comments = False
#         if queryset.count() < 50:
#             end_of_comments = True
#         serializer = CommentSerializer(queryset, many=True)
#         response = {
#             "page": page,
#             "replys": serializer.data,
#             "parent_post": int(pk),
#             "end_of_comments": end_of_comments
#         }
#         return Response(response)

#     def createcomment(self, request):
#         serializer = CreateCommentSerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         data = serializer.create_comment(data=request.data)
#         return Response(data)

#     def likecomment(self, request):
#         print(request.data)
#         serializer = LikeCommentSerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         serializer.add_like(data=request.data)
#         queryset = Comment.objects.get(pk=request.data['commentpk'])
#         serializer = CommentSerializer(queryset)
#         return Response(serializer.data)



#     def main(self, request, pk, page):
#         end_of_comments = False
#         queryset = CommentReply.objects.filter(
#             parent_comment=pk).order_by("-date").filter()
#         queryset = pageify(queryset=queryset, page=page, items_per_page=5 )
#         if queryset.count() < 50:
#             end_of_comments = True
#         serializer = CommentReplySerializer(queryset, many=True)
#         response = {
#             "page": page,
#             "comments": serializer.data,
#             "parent_post": int(pk),
#             "end_of_comments": end_of_comments
#         }
#         return Response(response)

#     def likecomment(self, request):
#         print(request.data)
#         serializer = LikeCommentSerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         serializer.add_like(data=request.data)
#         queryset = Comment.objects.get(pk=request.data['commentpk'])
#         serializer = CommentSerializer(queryset)
#         return Response(serializer.data)


# class CreatePostView(APIView):
#     parser_classes = (MultiPartParser, FormParser)

#     def post(self, request):
#         serializer = CreatePostSerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         data = serializer.create_post(data=request.data)
#         return Response(data)


# class CreateCommentView(APIView):
#     def post(self, request):
#         serializer = CreateCommentSerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         data = serializer.create_comment(data=request.data)
#         return Response(data)

# class CreateCommentReplyView(APIView):
#     def post(self, request):
#         serializer = CreateCommentReplySerializer(data=request.data)
#         if not serializer.is_valid():
#             return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
#         data = serializer.create(data=request.data)
#         return Response(data)