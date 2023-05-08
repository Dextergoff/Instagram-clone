from django.urls import path
from .views import *
app_name = "comments"
urlpatterns = [
    path('<parent>/<int:page>', CommentsView.as_view({'get': 'comments'}), ),
    path('replys/<pk>/<int:page>', ReplyView.as_view({'get': 'replys'}), ),
    path('like/', LikeComment.as_view({'post': 'like'}), ),
    path('createcomment/', CreateComment.as_view({'post': 'create'}), ),
]
