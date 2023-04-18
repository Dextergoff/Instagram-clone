from django.db import models

# Create your models here.
 
class Hashtag(models.Model):
    title = models.CharField(max_length=99)
    def __str__(self):
        return self.title
