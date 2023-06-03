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
from center.modules.actions.pageify import pageify

from center.settings import PAGEIFY, QUERYING
from django.http import HttpResponse
from users.serializers import UserSerializer
User = get_user_model()


class GetUser(viewsets.ViewSet):
    def main(self, request, pk):
        user = User.objects.get(pk=pk)
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)


class EditProfile(viewsets.ViewSet):

    def check_username(self, username, user):
        try:
            User.objects.get(username=username)
            return {"response": "username is taken"}
        except:
            return {"response": "username is available"}

    def edit_username(self, username, user):
        try:
            user.username = username
            return {"newusername": username}

        except Exception:
            return {"status": "HTTP_400_BAD_REQUEST"}

    def edit_description(self, description, user):
        try:
            user.description = description
            return {"newdescription": description}
        except:
            return {"status": "HTTP_400_BAD_REQUEST"}

    def edit_pfp(self, request, user):
        try:
            user.pfp = request.FILES['image']
            return {"newpfp": request.FILES['image']}
        except:
            return {"status": "HTTP_400_BAD_REQUEST"}

    def main(self, request):
        data = request.data
        user = User.objects.select_related().get(pk=data['user'])

        response = {'description': user.username,
                    'username': user.description, }
        try:
            username = data.get('username')
            if len(username) > 0:
                if data['save']:
                    item = self.edit_username(username, user)
                else:
                    item = self.check_username(username, user)
                response.update(item)
        except:
            TypeError
        try:
            image = request.FILES['image']
            if len(image) > 0:
                user.pfp = request.FILES['image']
        except:
            TypeError

        try:
            description = data.get('description')
            if len(description) > 0:
                item = self.edit_description(description, user)
                response.update(item)
        except:
            TypeError
        user.save()
        return Response(response)
