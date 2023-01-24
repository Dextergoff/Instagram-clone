from django.db import models
from center.user.models import User
class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField()
    
class Hashtag(models.Model):
    title = models.CharField(max_length=99)
    def __str__(self):
        return self.title
class CommentObj(models.Model):
    content = models.CharField(max_length=200)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    #add replys and likes
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=40)
    price = models.DecimalField(max_digits=99, decimal_places=2)
    desc = models.CharField(max_length=200)
    images = models.ManyToManyField(Image,blank=True)
    image = models.ImageField(blank=True,null=True)
    hashtags = models.ManyToManyField(Hashtag,blank=True)
    favorites = models.ManyToManyField(User, related_name="favorites",blank=True)
    likes = models.ManyToManyField(User, related_name="likes",blank=True)
    comments = models.ManyToManyField(CommentObj, blank=True)
  