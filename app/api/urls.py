from django.urls import path
from api.views import *
app_name="api"
urlpatterns = [ 
    path('post/', PostViewset.as_view({'get': 'main'}), ),
    path('like/', PostViewset.as_view({'get': 'like'}), ),
    path('unlike/', PostViewset.as_view({'get': 'unlike'}), ),
    path('cart/', CartViewSet.as_view({'get': 'main'}), ),
    path('addtocart/<pk>', CartViewSet.as_view({'get': 'addtocart'}), )
]