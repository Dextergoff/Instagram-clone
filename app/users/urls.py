from django.urls import path
from .apiviews import *
app_name = "user"
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetriveUserView.as_view()),
    path('forgot', Forgot.as_view()),
    path('resetpassword', ResetPassword.as_view()),
    path('authorizereset', AuthorizeReset.as_view()),
]
