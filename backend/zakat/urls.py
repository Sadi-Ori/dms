from django.urls import path
from .views import NisabRatesAPIView, ZakatCalculateAPIView

urlpatterns = [
    path('nisab/', NisabRatesAPIView.as_view(), name='api_nisab'),
    path('calculate/', ZakatCalculateAPIView.as_view(), name='api_zakat_calculate'),
]
