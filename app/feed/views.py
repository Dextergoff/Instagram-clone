from django.shortcuts import render, redirect
from django.views.generic import *
from .models import *
from .forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from cart.models import Cart
from django.http import JsonResponse

def ajaxaddlike(request,pk):
    post = Post.objects.get(pk = pk)
    like = request.POST.get("item")
    post.likes.add(request.user)
    post.save()
    return JsonResponse({"status": "success"})

def ajaxunlike(request,pk):
    post = Post.objects.get(pk = pk)
    like = request.POST.get("item")
    post.likes.remove(request.user)
    post.save()
    return JsonResponse({"status": "success"})



class HashtagView(View):
    def get(self, request, hashtag):
        hashtag = Hashtag.objects.get(title = hashtag)
        posts = Post.objects.filter(hashtags = hashtag)
        context={
            "posts":posts
        }
        return render(request, "hashtagview.html", context)

class UploadView(View):
    def get(self, request):
        return render(request, "createpost.html")

    def post(self, request):
        if request.method == "POST":
            desc = request.POST.get('desc')
            price = request.POST.get('price')
           
            post = Post.objects.create(
                user=request.user, 
                price = price,
                )
            for word in desc.split():
                if word[0] == '#':
                #check first chacacter of word
                    try:
                        hashtag = Hashtag.objects.get(title = word[1:])
                        post.hashtags.add(hashtag)

                    except:
                        hashtag = Hashtag.objects.create(title = word[1:])
                        post.hashtags.add(hashtag)
                    desc = desc.replace(word, "")
                    print(desc)
            images = request.FILES.getlist('image')
            for i in images:
                image = Image.objects.create(user = request.user, image=i)
                post.images.add(image)
            post.desc = desc
            post.save()
        return redirect("home")

class PostListView(LoginRequiredMixin ,ListView):
    login_url="/landing/"
    model = Post
    template_name = "feed.html"
    def get(self, request):
        posts = Post.objects.all()
        context = {
            'posts':posts,
        }
        return render(request, "feed.html", context)
        
class LandingView(TemplateView):
    template_name="landing.html"