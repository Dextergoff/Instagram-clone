from hashtags.models import *
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()


class Interest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    hashtag = models.ForeignKey(Hashtag, blank=True, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
