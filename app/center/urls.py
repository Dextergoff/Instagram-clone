from django.contrib import admin
from django.urls import path, include
from home.views import *
from feed.views import PostListView
from django.contrib.auth.views import LogoutView, LoginView
from cart.views import StripeIntentView
from django.conf.urls.static import static
from django.conf import settings
app_name = "center"
urlpatterns = [
    path("admin/", admin.site.urls),
    path("home/", HomeView.as_view(), name="home"),
    path("cart/", include('cart.urls', namespace="cart")),
    path("", include('feed.urls', namespace="feed")),
    path("profile/", include('uprofile.urls', namespace="profile")),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("signup/", SignupView.as_view(), name="signup"),
    path('create-payment-intent/', StripeIntentView.as_view(), name="create=payment-intent")
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
