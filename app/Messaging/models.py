from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()


class ChatRoom(models.Model):
    sender = models.CharField(
        max_length=500, blank=True, null=True)
    receiver = models.CharField(
        max_length=500, blank=True, null=True)
    message = models.CharField(max_length=500, blank=True, null=True)
