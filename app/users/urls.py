from django.urls import path
from .apiviews import RegisterView, RetriveUserView, ResetPasswordSendMail, ResetPassword, ResetPasswordVerify
app_name="user"
urlpatterns = [
    path('register', RegisterView.as_view()),
    path('me', RetriveUserView.as_view()),
    path('resetpasswordsendmail', ResetPasswordSendMail.as_view()),
    path('resetpassword', ResetPassword.as_view()),
    path('resetpasswordverify', ResetPasswordVerify.as_view()),


]
