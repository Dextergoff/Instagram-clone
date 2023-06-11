from django.urls import path
from .views import *
app_name = "posts"
urlpatterns = [
    path('post/<pk>', PostsView.as_view({'get': 'main'}), ),
    path('discover/<int:page>/',
         DiscoverView.as_view({'get': 'main', 'post': 'main'}), ),
    path('following/<int:page>/<int:pk>',
         FollowingView.as_view({'get': 'main', 'post': 'main'}), ),
    path('hashtag/<int:page>/',
         HashTagView.as_view({'get': 'main', 'post': 'main'}), ),
    path('likepost/', LikePost.as_view({'post': 'like'}), ),
    path('createpost/', CreatePostView.as_view(), ),
    path('delete_post/',
         DeletePost.as_view({'post': 'main', }), ),
]
