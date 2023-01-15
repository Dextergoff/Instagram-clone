from django.shortcuts import render
from django.views.generic import *
from feed.views import Post
class ProfileView(View):
    def get(self,request):
        user = self.request.user
        posts = Post.objects.filter(user=user)
        context={
            "posts":posts,
            "user":user,
        }
        return render(request, "profile.html", context)