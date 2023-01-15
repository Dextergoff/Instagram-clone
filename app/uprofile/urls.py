from .views import ProfileView
from django.urls import path
app_name = "profile"

urlpatterns = [
    path("", ProfileView.as_view(), name="profile")
]
