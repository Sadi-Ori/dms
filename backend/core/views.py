from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render, redirect
from django.contrib import messages

from .models import SiteSetting, FAQ, AnnualReport, ContactMessage, NewsletterSubscriber
from .serializers import (
    SiteSettingSerializer, FAQSerializer, AnnualReportSerializer,
    ContactMessageSerializer, NewsletterSubscriberSerializer
)
from .forms import ContactForm, NewsletterForm


class SiteSettingAPIView(APIView):
    def get(self, request):
        setting = SiteSetting.objects.first()
        if not setting:
            setting = SiteSetting.objects.create()
        serializer = SiteSettingSerializer(setting)
        return Response(serializer.data)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.filter(is_active=True)
    serializer_class = FAQSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category=category)
        return qs


class AnnualReportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AnnualReport.objects.all()
    serializer_class = AnnualReportSerializer


class ContactMessageCreateAPIView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "success": True,
                "message": "Thank you for reaching out! Our humanitarian response team will get back to you shortly.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class NewsletterSubscribeAPIView(generics.CreateAPIView):
    queryset = NewsletterSubscriber.objects.all()
    serializer_class = NewsletterSubscriberSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email', '').strip().lower()
        if not email:
            return Response({"success": False, "message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email, defaults={'is_active': True})
        if not created and not subscriber.is_active:
            subscriber.is_active = True
            subscriber.save()

        return Response({
            "success": True,
            "message": "You have been successfully subscribed to global humanitarian updates."
        }, status=status.HTTP_201_CREATED)


# Traditional Django template views for standalone backend testing
def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Your message has been received.")
            return redirect('core_contact')
    else:
        form = ContactForm()
    return render(request, 'core/contact.html', {'form': form})
