from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SiteSettingAPIView, FAQViewSet, AnnualReportViewSet,
    ContactMessageCreateAPIView, NewsletterSubscribeAPIView
)

router = DefaultRouter()
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'reports', AnnualReportViewSet, basename='annualreport')

urlpatterns = [
    path('settings/', SiteSettingAPIView.as_view(), name='api_settings'),
    path('contact/', ContactMessageCreateAPIView.as_view(), name='api_contact'),
    path('newsletter/', NewsletterSubscribeAPIView.as_view(), name='api_newsletter'),
    path('', include(router.urls)),
]
