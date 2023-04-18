from django.db import models
import datetime
from django.contrib.auth import get_user_model
from django.utils import timezone, dateformat
from time import gmtime, strftime
from hashtags.models import *
from django.utils.timezone import now
User=get_user_model()
class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()

class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=42, blank=True, null=True)
    title = models.CharField(max_length=40)
    desc = models.CharField(max_length=200)
    images = models.ManyToManyField(Image,blank=True)
    image = models.ImageField(blank=True,null=True)
    hashtags = models.ManyToManyField(Hashtag,blank=True)
    favorites = models.ManyToManyField(User, related_name="favorites",blank=True)
    likes = models.ManyToManyField(User, related_name="likes",blank=True)
    date = models.DateTimeField(default = now )
    likecount = models.IntegerField(default=0)
    postcount = models.IntegerField(default=0)
    commentcount = models.IntegerField(default=0)
    page = models.IntegerField(null=True)
    
