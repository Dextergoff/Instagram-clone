import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class MessageConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.group_name = 'chat_%s' % self.room_name
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

    def chat_message(self, event):
        self.send_to_socket(event['message'], event['sender'])

    def join_room(self):
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )

    def send_to_group(self, text, sender):
        async_to_sync(self.channel_layer.group_send)(
            self.group_name,
            {
                'type': 'chat_message',
                'message': text,
                'sender': sender,
            }
        )

    def send_to_socket(self, text, sender):
        self.send(text_data=json.dumps({
            'text': text,
            'sender': sender
        }))
