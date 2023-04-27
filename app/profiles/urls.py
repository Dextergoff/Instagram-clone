from django.urls import path
from .apiviews import *

app_name="profiles"
urlpatterns = [
    path('posts/<pk>/<int:page>', ProfilePosts.as_view({'get': 'main'}), ),
    path('editprofile', EditProfile.as_view({'post': 'main'}), ),

]