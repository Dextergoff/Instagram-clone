from django.urls import path
from .apiviews import *

app_name = "profiles"
urlpatterns = [
    path('posts/<int:requested_user_pk>/<int:pk>/<int:page>',
         ProfilePosts.as_view({'get': 'main'}), ),
    path('editprofile', EditProfile.as_view({'post': 'main'}), ),
    path('manage_followers/<int:pk>/<int:requested_user_pk>',
         ManageFollowers.as_view()),
    path('followers/<int:requested_user_pk>/<int:pk>/<int:page>',
         GetFollowers.as_view()),
    path('following/<int:requested_user_pk>/<int:pk>/<int:page>',
         GetFollowing.as_view()),

]
