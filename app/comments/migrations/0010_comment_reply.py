# Generated by Django 4.2 on 2023-05-09 20:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments', '0009_rename_parent_comment_comment_parent_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='reply',
            field=models.BooleanField(default=False),
        ),
    ]
