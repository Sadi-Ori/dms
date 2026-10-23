from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CategoryViewSet, AppealViewSet,
    DonationCreateAPIView, VolunteerCreateAPIView
)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'appeals', AppealViewSet, basename='appeal')

urlpatterns = [
    path('donations/', DonationCreateAPIView.as_view(), name='api_donations'),
    path('volunteers/', VolunteerCreateAPIView.as_view(), name='api_volunteers'),
    path('', include(router.urls)),
]
