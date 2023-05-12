from django.urls import path
from .views import *
app_name = "posts"
urlpatterns = [
    path('post/<pk>', PostsView.as_view({'get': 'main'}), ),
    path('page/<int:page>/',
         PageView.as_view({'get': 'main', 'post': 'main'}), ),
    path('likepost/', LikePost.as_view({'post': 'like'}), ),
    path('createpost/', CreatePostView.as_view(), ),
]
