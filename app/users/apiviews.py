from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics
from .serializers import UserCreateSerializer, UserSerializer, SendMailSerializer,ResetPasswordSerializer, VerifyResetSerializer
from .models import UserAccount
from rest_framework import viewsets

class RegisterView(APIView):
    def post(self,request):
        data = request.data
        serializer = UserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        user = serializer.create(serializer.validated_data)
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_201_CREATED)
        
class RetriveUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self,request):
        user = request.user
        user = UserSerializer(user)
        return Response(user.data, status=status.HTTP_200_OK)

class ResetPasswordSendMail(APIView):

    def post(self, request):
        data = request.data
        serializer = SendMailSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        data = serializer.send_email(serializer.validated_data)
       
        return Response(data, status=status.HTTP_200_OK)

class ResetPasswordVerify(APIView):
    def post(self, request):
        data = request.data
        serializer = VerifyResetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        data = serializer.verify(serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)


class ResetPassword(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        data = request.data
        serializer = ResetPasswordSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
        data = serializer.update(serializer.validated_data)
        return Response(data, status=status.HTTP_200_OK)


