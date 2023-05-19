from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

app_name = "center"
urlpatterns = [
    path("admin/", admin.site.urls),
    path('posts/', include('posts.urls', namespace='posts')),
    path('comments/', include('comments.urls', namespace='comments')),
    path('profiles/', include('profiles.urls', namespace='profiles')),
    path('messaging/', include('messaging.urls', namespace='messaging')),
    path('auth/users/', include('users.urls')),
    path('auth/token/', TokenObtainPairView.as_view()),
    path('auth/token/refresh/', TokenRefreshView.as_view()),
    path('auth/token/verify/', TokenVerifyView.as_view()),
    path('__debug__/', include('debug_toolbar.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
