# Generated by Django 4.2 on 2023-05-04 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0005_rename_isreply_comment_reply_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='replycount',
        ),
        migrations.AddField(
            model_name='comment',
            name='replys',
            field=models.BooleanField(default=False),
        ),
    ]
