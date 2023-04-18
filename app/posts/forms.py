from django import forms
from django.forms import ModelForm
from .models import *
class CreatePostForm(forms.Form):
    image = forms.ImageField()
    desc = forms.CharField(max_length=99)
    price = forms.DecimalField(max_digits=99,decimal_places=2)