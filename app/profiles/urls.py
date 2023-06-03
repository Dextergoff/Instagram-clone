from django.urls import path
from .apiviews import *

app_name = "profiles"
urlpatterns = [
    path('user/<int:pk>', GetUser.as_view({'post': 'main'}), ),

    path('editprofile', EditProfile.as_view({'post': 'main'}), ),

]
