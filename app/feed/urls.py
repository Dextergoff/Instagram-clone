from django.contrib import admin
from django.urls import path
from .views import PostListView, UploadView, LandingView, HashtagView, ajaxaddlike,ajaxunlike
from django.contrib.auth.decorators import login_required
app_name = "feed"
urlpatterns = [
    path('', PostListView.as_view(), name="feed"),
    path("createpost/", UploadView.as_view(), name="createpost"),
    path("landing/", LandingView.as_view(), name="landing"),
    path("hashtags/<hashtag>", HashtagView.as_view(), name="hashtags"),
    path("addlike/<pk>", ajaxaddlike, name="addlike"),
    path("unlike/<pk>", ajaxunlike, name="unlike"),

]