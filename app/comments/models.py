from django.db import models
import datetime
from django.contrib.auth import get_user_model
from django.utils import timezone, dateformat
from time import gmtime, strftime
from django.utils.timezone import now

User = get_user_model()


class Comment(models.Model):
    date = models.DateTimeField(default=now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=200)
    parent = models.PositiveIntegerField(default=0)
    post = models.PositiveIntegerField(default=0)
    likes = models.ManyToManyField(
        User, related_name="comment_likes", blank=True)
    likecount = models.IntegerField(default=0)
    has_replys = models.BooleanField(default=False)
    to = models.CharField(null=True, max_length=240)


class CommentReply(models.Model):
    date = models.DateTimeField(default=now)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=200, blank=True)
    body = models.CharField(max_length=200)
    parent_comment = models.ForeignKey(Comment, on_delete=models.CASCADE)
