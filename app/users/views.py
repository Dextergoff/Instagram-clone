from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core import exceptions
from django.contrib.auth.password_validation import validate_password
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.response import Response
import jwt
import uuid
from center import settings
User = get_user_model()


class Mail():
    def send_email(data, uid):
        send_mail(
            'reset password',
            'http://localhost:3000/resetpassword?uid='+uid,
            'dextergoff571@gmail.com',
            [data['email']]
        )


class CreateResetKey():
    def set_uid(user):
        uid = str(uuid.uuid4())
        user.resetkey = uid
        user.save()
        return uid


class Tokens():

    def get_token_data(data):
        try:
            token = data['token']
            payload = jwt.decode(
                token, key=settings.SECRET_KEY, algorithms=['HS256'])
            return payload
        except Exception as e:
            raise e

    def create_token(data):
        try:
            user = User.objects.get(email=data['email'])
            token = AccessToken.for_user(user)
            uid = CreateResetKey.set_uid(user)
        except Exception as e:
            raise exceptions.BadRequest(('could not create token'))
        return {"token": str(token), "uid": uid}

    def get_token_from_response(response):
        return response[0][1]


class Validation():
    def validate_email(data):
        try:
            user = User.objects.get(email=data)
            return user
        except exceptions.ValidationError:
            raise exceptions.ValidationError(
                ('Couldnt find account with this email'))

    def validate_password(data):
        newpassword = data
        try:
            validate_password(newpassword)
            return newpassword
        except exceptions.ValidationError as e:
            serializer_errors = serializers.as_serializer_error(e)
            raise exceptions.ValidationError(
                {'errors': serializer_errors['non_field_errors']}
            )
