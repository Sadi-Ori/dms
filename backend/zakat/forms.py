from django import forms
from .models import ZakatCalculation


class ZakatCalculationForm(forms.ModelForm):
    class Meta:
        model = ZakatCalculation
        fields = [
            'cash_in_hand', 'bank_deposits', 'gold_value', 'silver_value',
            'shares_stocks', 'business_cash_inventory', 'money_owed_to_you',
            'debts_due_now', 'immediate_expenses', 'currency'
        ]
        widgets = {
            'cash_in_hand': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'bank_deposits': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'gold_value': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'silver_value': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'shares_stocks': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'business_cash_inventory': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'money_owed_to_you': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'debts_due_now': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'immediate_expenses': forms.NumberInput(attrs={'class': 'w-full px-4 py-2 border rounded-md', 'min': '0', 'step': '0.01'}),
            'currency': forms.Select(choices=[('USD', 'USD ($)'), ('GBP', 'GBP (£)'), ('EUR', 'EUR (€)'), ('CAD', 'CAD ($)'), ('AUD', 'AUD ($)')], attrs={'class': 'px-3 py-2 border rounded-md'}),
        }
