import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class MessageConsumer(WebsocketConsumer):
    def join_room(self):
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        self.accept()

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = 'chat_%s' % self.room_name
        self.join_room(self)

    def disconnect(self, close_code):
        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )

    def send_message(self, text, sender):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'chat_message',
                'message': text,
                'sender': sender
            }
        )

    def send_to_group(self, text_data):
        # Receive message from WebSocket
        text_data = json.loads(text_data)
        text = text_data['text']
        sender = text_data['sender']
        # Send message to room group
        self.send_message(self, text=text, sender=sender)

    def send_to_socket(self, event):
        # Receive message from room group
        text = event['message']
        sender = event['sender']
        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'text': text,
            'sender': sender
        }))
