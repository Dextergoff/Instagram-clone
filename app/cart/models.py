from django.db import models
from feed.models import Post
from django.contrib.auth.models import User
from crum import get_current_user

class CartManager(models.Manager):
    def create(self, *args, **kwargs):
        user = get_current_user()
        try: 
            Cart.objects.get(user = user, paid=False)
        except:
            Cart.objects.create(user = user)
        super(Cart,self).save(*args, **kwargs)

class Item(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1)
    paid = models.BooleanField(default=False)
    date = models.DateField(blank=True, null=True)
    def __str__(self):
        return self.post.title
    
class Cart(models.Model):
    items = models.ManyToManyField(Item)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total = models.FloatField(default=0)
    paid = models.BooleanField(default=False)
    date = models.DateField(blank=True, null=True)
    objects = CartManager()
    def cartotal(self):
        sum = 0
        for i in self.items.all():
            sum += i.post.price * i.qty
        Cart.objects.update(total = sum)
        return sum
    #adds together manytomany field and returns total on request

class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=999)
    street_address = models.CharField(max_length=999)
    apartment = models.CharField(max_length=999, null=True, blank=True)
    country = models.CharField(max_length=999)
    state = models.CharField(max_length=999)
    zip_code = models.IntegerField()
    selected = models.BooleanField(default=False)
    samebilling = models.BooleanField(default=False)

class Billing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=999)
    street_address = models.CharField(max_length=999)
    apartment = models.CharField(max_length=999, null=True, blank=True)
    country = models.CharField(max_length=999)
    state = models.CharField(max_length=999)
    zip_code = models.IntegerField()
    selected = models.BooleanField(default=False)

