from django.dispatch import receiver
from . import signals
from . import signals
from django.contrib.auth import get_user_model
from .views import *
User=get_user_model()

@receiver(signals.post_created)
def create_hashtags(sender, post, **kwargs):
    title = post.title
    for word in title.split():
        if word[0] == '#':
            Hashtag.objects.get_or_create(title=word[1:])
            hashtag = Hashtag.objects.get(title=word[1:])
            post.hashtags.add(hashtag)
            newtitle = title.replace(word, "")
            post.title = newtitle
            post.save()
