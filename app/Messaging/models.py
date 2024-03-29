from django.contrib.auth import get_user_model
from django.db import models
from django.utils.timezone import now

User = get_user_model()


class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.CharField(max_length=500, blank=True, null=True)
    room_name = models.CharField(max_length=500, blank=True, null=True)
    date = models.DateTimeField(default=now)


class ChatRoom(models.Model):
    room_name = models.IntegerField(
        blank=True, null=True)
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='receiver')
