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
from center.modules.actions.pageify import pageify
from .models import *
from .serializers import *

from center.settings import PAGEIFY, QUERYING


class GetMessages(viewsets.ViewSet):
    def get_room_name(self, data):
        try:
            return data.data[0]['room_name']
        except:
            return None

    def main(self, request, room_name, page):

        queryset = Message.objects.filter(
            room_name=room_name).order_by('-date')
        queryset = pageify(queryset=queryset, page=page, items_per_page=10)
        serializer = MessageSerializer(
            queryset[PAGEIFY['QUERYSET_KEY']], many=True,)
        response = {
            QUERYING['PAGE_KEY']: [page],
            QUERYING['DATA_KEY']: serializer.data,
            PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']],
            'room_name': self.get_room_name(serializer)
        }
        # TODO remove the key names from settings in all views
        return Response(response)


class GetChatRoom(viewsets.ViewSet):
    def main(self, request, sender):
        queryset = ChatRoom.objects.filter(
            sender=sender)
        serializer = ChatRoomSerializer(
            queryset, many=True,)
        response = {
            QUERYING['DATA_KEY']: serializer.data,
            # PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']],
            # PAGEIFY['PC_KEY']: queryset[PAGEIFY['PC_KEY']]
        }
        # TODO pageify
        return Response(response)
