from django.db.models.signals import post_save, post_init
from django.db import models
import datetime
from django.contrib.auth import get_user_model
from django.utils import timezone, dateformat
from time import gmtime, strftime
from hashtags.models import *
from django.utils.timezone import now
User = get_user_model()


class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    image = models.ImageField(blank=True, null=True)
    hashtags = models.ManyToManyField(Hashtag, blank=True)
    likes = models.ManyToManyField(User, related_name="likes", blank=True)
    date = models.DateTimeField(default=now)
    likecount = models.IntegerField(default=0)
