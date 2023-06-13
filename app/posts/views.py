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
from .models import Post
from .serializers import *
from center.modules.actions.pageify import pageify
from center.settings import PAGEIFY, QUERYING
from django.db.models import Prefetch


class DeletePost(viewsets.ViewSet):
    def main(self, request):
        post_pks = request.data['post_pks']
        posts = Post.objects.filter(pk__in=post_pks)
        posts.delete()
        return Response(status.HTTP_200_OK)


class LikePost(viewsets.ViewSet):

    def proccess_like(self):
        if self.user in self.post.likes.all():
            self.post.likes.remove(self.user)
            self.post.likecount -= 1
        else:
            self.post.likes.add(self.user)
            self.post.likecount += 1
            self.proccess_interests()
        self.post.save(update_fields=['likecount'])

    def proccess_interests(self):
        for i in self.post.hashtags.all():
            hashtag = Hashtag.objects.get(title=i)
            try:
                item = Interest.objects.get(hashtag=hashtag, user=self.user)
            except:
                item = Interest.objects.create(hashtag=hashtag, user=self.user)
            item.score += 1
            item.save()

    def like(self, request):
        self.data = request.data
        self.user = User.objects.select_related().get(pk=self.data['requser'])
        self.post = Post.objects.select_related().prefetch_related(
            "likes").get(pk=self.data['pk'])
        self.proccess_like()
        serializer = LikePostSerializer(self.post)
        return Response(serializer.data)


class PostsView(viewsets.ViewSet):
    serializer = PostSerializer

    def main(self, request, pk):
        queryset = Post.objects.get(pk=pk)
        serializer = PostSerializer(queryset)
        return Response(serializer.data)


class DiscoverView(viewsets.ViewSet):
    serializer = PostSerializer

    def recommendation_engine(self, pk):
        user = User.objects.get(pk=pk)
        all_users = User.objects.exclude(pk=pk)
        user_liked_posts = Post.objects.filter(
            likes=user)
        recommendations = []
        qs = []
        if user_liked_posts:
            for other_user in all_users:
                similarity = self.calculate_similarity(user, other_user)
                if similarity > 0:
                    other_user_liked_posts = Post.objects.filter(
                        likes=other_user)
                    user_unseen_posts = Post.objects.exclude(
                        pk__in=other_user_liked_posts).exclude(likes=user)
                    for post in user_unseen_posts:
                        if post.pk not in recommendations:
                            recommendations.append((post, similarity))
            recommendations.sort(key=lambda x: x[1], reverse=True)
            for i in recommendations:
                if i[0] not in qs:
                    qs.append(i[0])
        else:
            qs = Post.objects.all().order_by("-date").prefetch_related(
                Prefetch('likes'),
                Prefetch('hashtags'))
        return qs

    def calculate_similarity(self, user1, user2):
        user1_liked_posts = Post.objects.filter(
            likes=user1)
        user2_liked_posts = Post.objects.filter(
            likes=user2)
        similarity = len(
            set(user1_liked_posts).intersection(user2_liked_posts))
        return similarity

    def main(self, request, page, pk):
        qs = self.recommendation_engine(pk)
        queryset = pageify(queryset=qs,
                           page=page, items_per_page=5)
        serializer = PostSerializer(
            queryset[PAGEIFY['QUERYSET_KEY']], many=True)
        response = {
            QUERYING['ND_KEY']: {QUERYING['PAGE_KEY']: [page], QUERYING['DATA_KEY']: serializer.data},
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']]
        }
        return Response(response)


class FollowingView(viewsets.ViewSet):
    serializer = PostSerializer

    def main(self, request, pk, page):
        user = User.objects.get(pk=pk)
        following = user.following.all()
        queryset = Post.objects.filter(user__in=following).order_by("-date").prefetch_related(
            Prefetch('likes'),
            Prefetch('hashtags'))
        queryset = pageify(queryset=queryset, page=page, items_per_page=5)
        serializer = PostSerializer(
            queryset[PAGEIFY['QUERYSET_KEY']], many=True)
        response = {
            QUERYING['ND_KEY']: {QUERYING['PAGE_KEY']: [page], QUERYING['DATA_KEY']: serializer.data},
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']]
        }
        return Response(response)


class HashTagView(viewsets.ViewSet):
    serializer = PostSerializer

    def main(self, request, page, **kwargs):
        kwargs = request.data['filter']
        hashtag = Hashtag.objects.get(title=kwargs.get('hashtags'))
        kwargs = {"hashtags": hashtag}
        queryset = Post.objects.filter(**kwargs).order_by("-date").prefetch_related(
            Prefetch('likes'),
            Prefetch('hashtags'))
        queryset = pageify(queryset=queryset, page=page, items_per_page=5)
        serializer = PostSerializer(
            queryset[PAGEIFY['QUERYSET_KEY']], many=True)
        response = {
            QUERYING['ND_KEY']: {QUERYING['PAGE_KEY']: [page], QUERYING['DATA_KEY']: serializer.data},
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']]
        }
        return Response(response)


class CreatePostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.create_post(data=request.data)
            return Response(data)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
