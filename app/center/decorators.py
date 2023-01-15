from functools import wraps
from cart.models import Cart

def cart_required(f):
    @wraps(f)
    def wrapper(request, *args, **kwargs):
        user = request.user
        cartobj = Cart.objects.get_or_create(user = user, paid = False)
        cartobj = Cart.objects.get(user=user, paid=False)
        return f(cartobj, request, *args, **kwargs)
    return wrapper

def landing_redirect(f):
    @wraps(f)
    def wrapper(request, *args, **kwargs):
        if request.user == None:
            return ()