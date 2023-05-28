import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from .models import *
from users.serializers import UserSerializer


class MessageConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.join_room()
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.send_to_group(data['text'], data['sender'])
        self.store_message(data['sender'], data['text'])
        self.create_room(data['sender'], data['receiver'])

    def chat_message(self, event):
        self.send_to_socket(event['message'], event['sender'])

    def store_message(self, sender, text):
        Message.objects.create(room_name=self.room_name,
                               message=text, user=User.objects.get(pk=sender))

    def join_room(self):
        self.group_name = 'chat_%s' % self.room_name
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

    def send_to_group(self, text, sender):
        user = UserSerializer(User.objects.get(pk=sender))
        # might be able to get rid of this when chatroom model is finished
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'chat_message',
                'message': text,
                'sender': sender,
                'user': user.data
            }
        )

    def send_to_socket(self, text, sender):
        user = UserSerializer(User.objects.get(pk=sender))
        self.send(text_data=json.dumps({
            'text': text,
            'sender': sender,
            'user': user.data
        }))

    def create_room(self, sender, receiver):
        sender = User.objects.get(pk=sender)
        receiver = User.objects.get(pk=receiver)

        ChatRoom.objects.get_or_create(
            sender=sender, receiver=receiver, room_name=self.room_name)
        ChatRoom.objects.get_or_create(
            sender=receiver, receiver=sender, room_name=self.room_name)
