# Generated by Django 4.2.1 on 2023-05-18 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Messaging', '0005_alter_chatroom_receiver_alter_chatroom_sender'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chatroom',
            old_name='receiver',
            new_name='receiver_name',
        ),
        migrations.RenameField(
            model_name='chatroom',
            old_name='sender',
            new_name='sender_name',
        ),
    ]
