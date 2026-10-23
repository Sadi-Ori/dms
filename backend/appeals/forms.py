from django import forms
from .models import Donation, Volunteer, Appeal


class DonationForm(forms.ModelForm):
    class Meta:
        model = Donation
        fields = [
            'appeal', 'donor_first_name', 'donor_last_name', 'donor_email',
            'donor_phone', 'amount', 'currency', 'frequency', 'is_anonymous',
            'payment_method', 'notes'
        ]
        widgets = {
            'appeal': forms.Select(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300'}),
            'donor_first_name': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'First Name'}),
            'donor_last_name': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Last Name'}),
            'donor_email': forms.EmailInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Email Address'}),
            'donor_phone': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Phone Number'}),
            'amount': forms.NumberInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300 font-bold text-lg', 'placeholder': 'Amount', 'min': '1'}),
            'currency': forms.Select(choices=[('USD', 'USD ($)'), ('GBP', 'GBP (£)'), ('EUR', 'EUR (€)'), ('CAD', 'CAD ($)'), ('AUD', 'AUD ($)')], attrs={'class': 'px-3 py-3 rounded-lg border border-gray-300'}),
            'frequency': forms.Select(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300'}),
            'payment_method': forms.HiddenInput(),
            'notes': forms.Textarea(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'rows': 2, 'placeholder': 'Dedication or Dua request (optional)'}),
        }

    def clean_amount(self):
        amt = self.cleaned_data.get('amount')
        if amt is None or amt <= 0:
            raise forms.ValidationError("Donation amount must be greater than 0.")
        return amt


class QuickDonationForm(forms.Form):
    appeal_id = forms.IntegerField(required=False)
    amount = forms.DecimalField(max_digits=10, decimal_places=2, min_value=1)
    frequency = forms.ChoiceField(choices=[('once', 'Single'), ('monthly', 'Monthly')])
    currency = forms.CharField(max_length=5, initial='USD')


class VolunteerForm(forms.ModelForm):
    class Meta:
        model = Volunteer
        fields = [
            'first_name', 'last_name', 'email', 'phone',
            'city', 'country', 'availability', 'skills', 'motivation'
        ]
        widgets = {
            'first_name': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'First Name'}),
            'last_name': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Last Name'}),
            'email': forms.EmailInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Email Address'}),
            'phone': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Phone Number'}),
            'city': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'City'}),
            'country': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'Country'}),
            'availability': forms.Select(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300'}),
            'skills': forms.TextInput(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'placeholder': 'e.g. Healthcare, Outreach, Logistics, Media'}),
            'motivation': forms.Textarea(attrs={'class': 'w-full px-4 py-3 rounded-lg border border-gray-300', 'rows': 4, 'placeholder': 'Tell us why you wish to volunteer with our humanitarian mission'}),
        }
