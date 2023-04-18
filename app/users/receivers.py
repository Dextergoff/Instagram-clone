from django.dispatch import receiver
from . import signals
from . import signals
from django.contrib.auth import get_user_model
from .views import *
User=get_user_model()

@receiver(signals.newpassword_validated)
def update_password(sender, data, **kwargs):
    token_data = Tokens.get_token_data(data)
    user = User.objects.get(pk = token_data['user_id'])
    user.set_password(data['newpassword'])
    user.save()

@receiver(signals.email_validated)
def send_email(sender, data, **kwargs):
    token = Tokens.create_token(data=data)
    Mail.send_email(data=data, uid=token['uid'])
    return token