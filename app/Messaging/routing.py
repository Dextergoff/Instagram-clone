from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.urls import re_path, path
from .consumers import MessageConsumer
websocket_urlpatterns = [
    re_path(r"ws/(?P<room_name>\w+)$", MessageConsumer.as_asgi()),
]
