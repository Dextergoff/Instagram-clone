from django.urls import path
from .views import *
app_name="hashtags"
urlpatterns = [ 
    path('<hashtag>/<int:page>', HashtagView.as_view({'get': 'main'}), ),
]