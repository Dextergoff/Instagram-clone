from django.contrib import admin
from .models import *
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'title',)

admin.site.register(Post, PostAdmin)
admin.site.register(Image)

