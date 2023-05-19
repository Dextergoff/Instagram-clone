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
from center.modules.actions.queryactions import pageify
from .models import *
from .serializers import *

from center.settings import PAGEIFY, QUERYING
# Create your views here.


# class GetRoom(viewsets.ViewSet):
#     def main(self, request, data):

#         queryset = ChatRoom.objects.get(
#             sender_name=data['sender_name'], receiver_name=data['receiver_name'])
#         serializer = ChatRoomSerializer(
#             queryset[PAGEIFY['QUERYSET_KEY']], many=True)
#         response = {
#             QUERYING['ND_KEY']: {QUERYING['DATA_KEY']: serializer.data},
#             PAGEIFY['PC_KEY']: queryset[PAGEIFY['PC_KEY']]
#         }
#         return Response(response)


# class GetMessages(viewsets.ViewSet):
#     def main(self, request, sender_name, receiver_name, page):
#         queryset = Messages.objects.get(
#             sender_name=sender_name, receiver_name=receiver_name)
#         queryset = pageify(queryset=queryset, page=page, items_per_page=5)
#         serializer = ChatRoomSerializer(
#             queryset[PAGEIFY['QUERYSET_KEY']], many=True)
#         response = {
#             QUERYING['ND_KEY']: {QUERYING['PAGE_KEY']: [page], QUERYING['DATA_KEY']: serializer.data},
#             PAGEIFY['EOP_KEY']: queryset[PAGEIFY['EOP_KEY']],
#             PAGEIFY['PC_KEY']: queryset[PAGEIFY['PC_KEY']]
#         }
#         return Response(response)
