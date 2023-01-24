from django.contrib import admin
from django.urls import path
from .views import PostListView, UploadView, LandingView, HashtagView, ajaxlike,ajaxunlike
from django.contrib.auth.decorators import login_required
app_name = "feed"
urlpatterns = [
    path('', PostListView.as_view(), name="feed"),
    path("createpost/", UploadView.as_view(), name="createpost"),
    path("landing/", LandingView.as_view(), name="landing"),
    path("hashtags/<hashtag>", HashtagView.as_view(), name="hashtags"),
    path("like/<pk>", ajaxlike, name="like"),
    path("unlike/<pk>", ajaxunlike, name="unlike"),

]