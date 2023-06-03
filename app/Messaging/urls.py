from django.urls import path
from .views import *

app_name = "Messaging"
urlpatterns = [
    path('messages/<room_name>/<int:page>',
         GetMessages.as_view({'get': 'main'}), ),
    path('chatroom/<sender>/<int:page>',
         GetChatRoom.as_view({'get': 'main'}), ),
]
