# Generated by Django 4.2 on 2023-05-09 22:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0010_comment_reply'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='reply',
        ),
    ]