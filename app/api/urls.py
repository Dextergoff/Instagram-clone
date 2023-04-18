from django.urls import path
from api.views import *
app_name="api"
urlpatterns = [ 
    # path('post/<pk>', PostsView.as_view({'get': 'main'}), ),
    # path('profileposts/<pk>/<int:page>', ProfilePosts.as_view({'get': 'main'}), ),
    # path('page/<int:page>', PageView.as_view({'get': 'main'}), ),
    # path('hashtag/<hashtag>/<int:page>', HashtagView.as_view({'get': 'main'}), ),



    # path('comments/<pk>/<int:page>', CommentsView.as_view({'get': 'getcomments'}), ),
    # path('likecomment/', CommentsView.as_view({'post': 'likecomment'}), ),
    # path('commentreplys/<pk>/<int:page>', CommentsView.as_view({'get': 'getreplys'}), ),

    # path('createreply/', CreateCommentReplyView.as_view(), ),




    # path('createcomment/', CommentsView.as_view({'post': 'createcomment'}), ),

    # path('likepost/', PostsView.as_view({'post': 'likepost'}), ),
    # path('unlike/', PostsView.as_view({'get': 'unlike'}), ),
    # path('createpost/', CreatePostView.as_view(), ),

  
]