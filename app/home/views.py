from django.shortcuts import render,reverse
from django.views.generic import *
from .forms import *


class HomeView(TemplateView):
    template_name = "home.html"

class SignupView(CreateView):
    form_class = SignupForm
    template_name = "registration/signup.html"

    def get_success_url(self):
        return reverse("login")