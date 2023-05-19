from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()

class Messages(models.Model):
    content = models.CharField(max_length=500, blank=True, null=True)

class ChatRoom(models.Model):
    sender_name = models.CharField(
        max_length=500, blank=True, null=True)
    receiver_name = models.CharField(
        max_length=500, blank=True, null=True)
    message = models.CharField(max_length=500, blank=True, null=True)
