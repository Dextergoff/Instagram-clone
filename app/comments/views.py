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
from .models import Comment
from .serializers import *
from center.modules.actions.queryactions import pageify
from center.settings import PAGEIFY, QUERYING
class ReplyView(viewsets.ViewSet):
    def replys(self,request,pk,page):
            queryset = Comment.objects.filter(parent=pk, isreply=True).order_by("replyingto").filter()
            queryset = pageify(queryset=queryset, page=page, items_per_page=50)
            serializer = CommentSerializer(queryset[PAGEIFY['QUERYSET_KEY']], many=True)
            response = {
                QUERYING['PAGE_KEY']: QUERYING['PAGE_KEY'],
                QUERYING['DATA_KEY']: serializer.data,
                QUERYING['PARENT_KEY']: int(pk),
                PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']]
            }
            return Response(response)

           
class LikeComment(viewsets.ViewSet):

    def like(self, request):
        serializer = LikeCommentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        serializer.add_like(data=request.data)
        queryset = Comment.objects.get(pk=request.data['pk'])
        serializer = CommentSerializer(queryset)
        return Response(serializer.data)

         
class CreateComment(viewsets.ViewSet):

     def create(self, request):
        serializer = CreateCommentSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        data = serializer.handle_comment(data=request.data)
        return Response(data)
        
class CommentsView(viewsets.ViewSet):
    
    def get_objs(self, pk):
        queryset = Comment.objects.filter(parent=pk).order_by("-date").filter()
        return queryset

    def comments(self, request,*args, **kwargs):
        page = kwargs['page']
        pk = kwargs['page']
        queryset = self.get_objs(pk)
        queryset = pageify(queryset=queryset, page=page, items_per_page=50)
        serializer = CommentSerializer(queryset[PAGEIFY['QUERYSET_KEY']], many=True)
        response = {
            QUERYING['PAGE_KEY']: page,
            QUERYING['DATA_KEY']: serializer.data,
            QUERYING['PARENT_KEY']: int(pk),
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']]
        }
        return Response(response)

