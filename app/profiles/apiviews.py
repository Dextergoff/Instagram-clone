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
from django.shortcuts import get_object_or_404
from posts.models import Post
from .serializers import *
from center.modules.actions.queryactions import pageify
from center.settings import PAGEIFY, QUERYING
class ProfilePosts(viewsets.ViewSet):
    serializer = GalleryPostSerializer

    def main(self, request, pk, page):
        queryset = Post.objects.filter(user=pk).order_by("-date").prefetch_related('likes').select_related('user')
        queryset = pageify(queryset=queryset, page=page, items_per_page=5)
        serializer = GalleryPostSerializer(queryset[PAGEIFY['QUERYSET_KEY']], many=True)
        response = {
            QUERYING['ND_KEY']: {QUERYING['PAGE_KEY']: [page], QUERYING['DATA_KEY']: serializer.data},
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']],
            PAGEIFY['PC_KEY']: queryset[PAGEIFY['PC_KEY']]
        }
        return Response(response)
