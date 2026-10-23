from django import forms
from .models import ContactMessage, NewsletterSubscriber


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'phone', 'subject', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none transition',
                'placeholder': 'Full Name'
            }),
            'email': forms.EmailInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none transition',
                'placeholder': 'Email Address'
            }),
            'phone': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none transition',
                'placeholder': 'Phone Number (optional)'
            }),
            'subject': forms.TextInput(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none transition',
                'placeholder': 'Subject'
            }),
            'message': forms.Textarea(attrs={
                'class': 'w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-sky-500 focus:outline-none transition',
                'rows': 5,
                'placeholder': 'How can our global humanitarian team help you?'
            }),
        }

    def clean_name(self):
        name = self.cleaned_data.get('name')
        if len(name.strip()) < 2:
            raise forms.ValidationError("Please provide your full name.")
        return name.strip()

    def clean_message(self):
        msg = self.cleaned_data.get('message')
        if len(msg.strip()) < 10:
            raise forms.ValidationError("Message must be at least 10 characters long.")
        return msg.strip()


class NewsletterForm(forms.ModelForm):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']
        widgets = {
            'email': forms.EmailInput(attrs={
                'class': 'px-4 py-3 rounded-l-lg text-gray-900 border-none focus:outline-none w-full text-sm',
                'placeholder': 'Enter your email address'
            })
        }
