from django.shortcuts import render, redirect
from django.views.generic import *
from feed.models import Post
from .models import *
import stripe
import json
from django.http import JsonResponse
from django.conf import settings
from .forms import QtyForm, AddressForm, BillingForm
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.utils.crypto import get_random_string
from datetime import date
from django.contrib import messages
from center.decorators import cart_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.decorators import api_view
stripe.api_key = 'sk_test_51MHX5JJCVLOPsfZQaE7TfdhvWmppBC0KrPY9awBwQNpF1IFxvuh40lpzngQZj6RjhBYIR20w3bMJphk3txedRtmk00umjPFUf3'

@login_required(login_url="/landing/")
@cart_required
def cart_view(cartobj, request):
    context={
        "cart":cartobj,
        }
    return render(request, "cart.html", context)
# renders template with cart object gotten from cart required function in decorators.py

@login_required(login_url="/landing/")
@cart_required
def add_to_cart(cartobj, request, pk):
    post = Post.objects.get(pk=pk)
    #get post with pk from url
    try:
        item = Item.objects.get(post=post, user=request.user, paid = False) 
    except:
        item = Item.objects.create(post=post, user=request.user, paid = False)  
    #get or create item
    cartobj.items.add(item)
    cartobj.save()
    #add item to cart object manytomany field
    return redirect("feed:feed")

@login_required(login_url="/landing/")
@cart_required
def checkout_view(cartobj, request, *args, **kwargs):
    address_all = Address.objects.filter(user=request.user)
    billing_all = Billing.objects.filter(user=request.user)
    try: 
        Address.objects.get(user = request.user, samebilling=True)
        samebilling=True
    except:
        samebilling=False
    #get all addresses belonging to request user
    if not address_all: 
        messages.error(request,"add address to continue to checkout")
        return redirect("cart:addaddress")
    #check if user has any adresses added
    if not cartobj.items.all():
        messages.error(request, 'Cart is empty')
        return redirect("cart:cart")
    #check if cart is empty
    else:
        context={
            "cart":cartobj,
            "addresses":address_all,
            "billing":billing_all,
            "samebilling":samebilling,
            "STRIPE_PUBLIC_KEY": settings.STRIPE_PUBLIC_KEY
            }
        return render(request, "checkout.html", context)

@login_required(login_url="/landing/")
def deleteaddress(request, pk, a_or_b, *args, **kwargs):
    print(a_or_b)
    if a_or_b == 'a':
        address = Address.objects.get(user = request.user, pk=pk)
    elif a_or_b == 'b':
        address = Billing.objects.get(user = request.user, pk=pk)
    #get address from url
    address.delete()
    #if address belongs to req user then delete
    return redirect("cart:checkout")

@login_required(login_url="/landing/")
def selectaddress(request, pk, a_or_b, *args, **kwargs):
    if a_or_b == 'a':
        address = Address.objects.get(pk=pk)
        try:
            oldaddress = Address.objects.get(user=request.user, selected = True)
        except: 
            oldaddress = None

    elif a_or_b == 'b':
        address = Billing.objects.get(pk=pk)
        try:
            oldaddress = Billing.objects.get(user=request,selected = True)
        except:
            oldaddress = None
    #get address
    if oldaddress != None:
        oldaddress.selected = False
        oldaddress.save()
        print(oldaddress)
    #check if there is a address already selected
    address.selected = True
    address.save()
    #select requested address
    return redirect("cart:checkout")
    
@login_required(login_url="/landing/")
def samebilling(request, action, pk, *args, **kwargs):
    address = Address.objects.get(pk=pk)
    #gets requested address
    if address.user == request.user:
        if action == 'check':
            try:
                oldaddress = Address.objects.get(samebilling = True)
                oldaddress.samebilling = False
                oldaddress.save()
            except:
                oldaddress = None
            address.samebilling = True
        #if requested action is check then samebilling varible is equal to true
        elif action == 'uncheck':
            address.samebilling = False
        address.save()
        #else is equal to false 
    return redirect("cart:checkout")

class RemoveFromCart(View):
    def get(self,request,pk):
        item = Item.objects.get(pk=pk)
        #get item
        if item.user == request.user:
        #check that item belongs to user
            item.delete()
        #delete item
        return redirect("cart:cart")

class ChangeQty(View):
    def post(self,request,pk):
        item = Item.objects.get(pk = pk)
        if request.method == "POST":
            form = QtyForm(request.POST)
            if form.is_valid():
                qty = form.cleaned_data['qty']
        if qty > 0:
            item.qty = qty
            item.save()
        else:
            item.delete()
        return redirect("cart:cart")

    
class AddressView(View):
    def get(self, request):
        form = AddressForm()
        context = {
            "form":form
        }
        return render(request, "addressform.html", context)

    def post(self, *args, **kwargs):
        form = AddressForm(self.request.POST or None)
        if form.is_valid():
            staddress = form.cleaned_data.get('staddress')
            fullname = form.cleaned_data.get('fullname')
            aptaddress = form.cleaned_data.get('aptaddress')
            country = form.cleaned_data.get('country')
            zip = form.cleaned_data.get('zip')
            if not form.cleaned_data.get('state'):
                state = form.cleaned_data.get('stateforeign')
            else:
                state = form.cleaned_data.get('state')
            address = Address.objects.create(
                user = self.request.user,
                street_address = staddress,
                full_name = fullname,
                apartment = aptaddress,
                country = country,
                zip_code = zip,
                state = state,
            )
            try:
                Address.objects.get(user=self.request.user)
                address.selected=True
                address.save()
            except:
                pass
            return redirect("cart:checkout")
        return redirect("cart:checkout")


class BillingView(View):
    def get(self, request):
        form = BillingForm()
        context = {
            "form":form
        }
        return render(request, "billingform.html", context)

    def post(self, *args, **kwargs):
        form = BillingForm(self.request.POST or None)
        if form.is_valid():
            staddress = form.cleaned_data.get('staddress')
            fullname = form.cleaned_data.get('fullname')
            aptaddress = form.cleaned_data.get('aptaddress')
            country = form.cleaned_data.get('country')
            zip = form.cleaned_data.get('zip')
            if not form.cleaned_data.get('state'):
                state = form.cleaned_data.get('stateforeign')
            else:
                state = form.cleaned_data.get('state')
            address = Billing.objects.create(
                user = self.request.user,
                street_address = staddress,
                full_name = fullname,
                apartment = aptaddress,
                country = country,
                zip_code = zip,
                state = state,
            )
            try:
                Billing.objects.get(user=self.request.user)
                address.selected=True
                address.save()
            except:
                pass
            return redirect("cart:checkout")
        return redirect("cart:checkout")

class StripeIntentView(View):
    def post(self, request, *args, **kwargs):
        cart = Cart.objects.get(user=request.user, paid=False)
        cartotal = cart.cartotal()
        cartotal = cartotal*100
        cartotal = int(cartotal)
        try:
            intent = stripe.PaymentIntent.create(
                amount=cartotal,
                currency='usd',
                automatic_payment_methods={
                    'enabled': True,
                },
            )
            return JsonResponse({
                'clientSecret': intent['client_secret']
            })
        except Exception as e:
            return JsonResponse({ 'error': str(e) })

class Stripesuccess(View):
    def get(self, request,):
        items = Item.objects.filter(user = request.user, paid = False)
        today = date.today()
        for i in items:
            i.paid = True
            i.date = today
            i.save()
        context = {
            "items":items
        }
        return render(request, "Cartcomplete.html", context)

