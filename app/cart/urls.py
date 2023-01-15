from django.contrib import admin
from django.urls import path
from cart.views import add_to_cart,cart_view,RemoveFromCart,ChangeQty,checkout_view,AddressView,deleteaddress,selectaddress,Stripesuccess,samebilling,BillingView
app_name = "cart"
urlpatterns = [
    path('', cart_view, name="cart"),
    path('additem/<pk>/', add_to_cart, name="additem"),
    path('removeitem/<pk>/', RemoveFromCart.as_view(), name="removeitem"),
    path('modqty/<pk>', ChangeQty.as_view(), name="modqty"),
    path('checkout/', checkout_view, name="checkout"),
    path('addaddress/', AddressView.as_view(), name="addaddress"),
    path('addbilling/', BillingView.as_view(), name="addbilling"),
    path('deleteaddress/<pk>/<a_or_b>', deleteaddress, name="deleteaddress"),
    path('selectaddress/<pk>/<a_or_b>', selectaddress, name="selectaddress"),
    path('samebilling/<pk>/<action>', samebilling, name="samebilling"),
    path('stripesuccess/', Stripesuccess.as_view(), name="stripesuccess"),
]