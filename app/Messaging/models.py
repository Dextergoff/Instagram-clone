from django.contrib.auth import get_user_model
from django.db import models
User = get_user_model()


class ChatRoom(models.Model):
    sender = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="sender")
    receiver = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="receiver")

    #


class Messages(models.Model):
    parent = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    content = models.CharField(max_length=500, blank=True, null=True)
