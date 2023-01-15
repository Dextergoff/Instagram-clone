from django import forms 
from django.forms import ModelForm
from .models import Item
from django_countries.fields import CountryField
from django_countries.widgets import CountrySelectWidget
from localflavor.us.us_states import STATE_CHOICES

class QtyForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['qty']

class AddressForm(forms.Form):
    fullname = forms.CharField()
    staddress = forms.CharField()
    aptaddress = forms.CharField(required=False)
    country = CountryField(blank_label='Country').formfield(
        widget=CountrySelectWidget(attrs={
            'class':'custom-select d-block w-100 form-select'
        })
    )
    state = forms.ChoiceField(required=False,choices=STATE_CHOICES, widget=forms.Select(attrs={'class':'custom-select d-block w-100 form-select'}))
    stateforeign = forms.CharField(required=False)
    city = forms.CharField()
    zip = forms.CharField()
    
class BillingForm(forms.Form):
    fullname = forms.CharField()
    staddress = forms.CharField()
    aptaddress = forms.CharField(required=False)
    country = CountryField(blank_label='Country').formfield(
        widget=CountrySelectWidget(attrs={
            'class':'custom-select d-block w-100 form-select'
        })
    )
    state = forms.ChoiceField(required=False,choices=STATE_CHOICES, widget=forms.Select(attrs={'class':'custom-select d-block w-100 form-select'}))
    stateforeign = forms.CharField(required=False)
    city = forms.CharField()
    zip = forms.CharField()