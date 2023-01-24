from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from rest_framework.decorators import api_view
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
from django.contrib.auth.models import update_last_login
from django.core.exceptions import ObjectDoesNotExist
from center.decorators import cart_required
from django.shortcuts import get_object_or_404
from feed.models import Post
from .serializers import *
from cart.models import *

class PostViewset(viewsets.ViewSet):
    serializer = PostSerializer
    def main(self,request, pk=None):
        queryset = Post.objects.all()
        serializer = PostSerializer(queryset, many=True)
        return Response(serializer.data)

    def like(self,request,pk=None):
        post = Post.objects.get(pk=pk)
        post.likes.add(request.user)
        post.save()
        
    def unlike(self,request,pk=None):
        post = Post.objects.get(pk=pk)
        post.likes.remove(request.user)
        post.save()

class CartViewSet(viewsets.ViewSet):

    def main(self,request):
        queryset = Cart.objects.get(user = request.user, paid = False)
        serializer = CartSerializer(queryset, many=False)
        return Response(serializer.data)

    def addtocart(self, request,pk=None):
        cartobj = Cart.objects.get_or_create(user = request.user, paid = False)
        cartobj = Cart.objects.get(user=request.user, paid=False)
        queryset = Post.objects.all()
        post = get_object_or_404(queryset, pk=pk)
        try:
            item = Item.objects.get(post=post, user=request.user, paid = False) 
        except:
            item = Item.objects.create(post=post, user=request.user, paid = False)  
        #get or create item
        cartobj.items.add(item)
        cartobj.save()

        serializer = PostSerializer(post)
        return Response(serializer.data)