from channels.routing import ProtocolTypeRouter, URLRouter
# import app.routing
from django.urls import re_path, path
from .consumers import MessageConsumer
websocket_urlpatterns = [

    path(
        'ws/<room_name>',
        MessageConsumer.as_asgi(),
        name='project_config'
    ),
]
application = ProtocolTypeRouter({
    'websocket':
        URLRouter(
            websocket_urlpatterns
        ),
})
