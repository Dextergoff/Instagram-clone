from django.contrib import admin
from .models import *
class TestModelAdmin(admin.ModelAdmin):
    def get_queryset(self, request):
        test_model_qs = super(TestModelAdmin, self).get_queryset(request)
        test_model_qs = test_model_qs.prefetch_related('many-to-many-field')
        raw_id_fields = ("likes",)
        return test_model_qs
admin.site.register(Post, TestModelAdmin)
admin.site.register(Image)

