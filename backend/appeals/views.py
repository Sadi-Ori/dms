from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render, get_object_or_404, redirect
from django.db.models import F
from decimal import Decimal

from .models import Category, Appeal, Donation, Volunteer
from .serializers import (
    CategorySerializer, AppealSerializer,
    DonationSerializer, VolunteerSerializer
)
from .forms import DonationForm, VolunteerForm


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'


class AppealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Appeal.objects.all()
    serializer_class = AppealSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        qs = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            qs = qs.filter(category__slug=category)
        
        is_urgent = self.request.query_params.get('urgent')
        if is_urgent is not None:
            qs = qs.filter(is_urgent=(is_urgent.lower() in ['true', '1']))
        
        is_zakat = self.request.query_params.get('zakat')
        if is_zakat is not None:
            qs = qs.filter(is_zakat_eligible=(is_zakat.lower() in ['true', '1']))
            
        is_featured = self.request.query_params.get('featured')
        if is_featured is not None:
            qs = qs.filter(is_featured=(is_featured.lower() in ['true', '1']))

        return qs


class DonationCreateAPIView(generics.CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        
        # Support batch donations from cart checkout
        cart_items = data.get('cart_items')
        if cart_items and isinstance(cart_items, list) and len(cart_items) > 0:
            created_donations = []
            total_sum = Decimal('0.00')
            first_txn = None
            first_receipt = None
            
            for item in cart_items:
                appeal_id = item.get('appeal_id')
                appeal = None
                if appeal_id:
                    try:
                        appeal = Appeal.objects.get(id=appeal_id)
                    except Appeal.DoesNotExist:
                        pass
                
                amount = Decimal(str(item.get('amount', '10.00')))
                total_sum += amount
                
                donation = Donation.objects.create(
                    appeal=appeal,
                    donor_first_name=data.get('donor_first_name', 'Generous'),
                    donor_last_name=data.get('donor_last_name', 'Donor'),
                    donor_email=data.get('donor_email', 'donor@example.com'),
                    donor_phone=data.get('donor_phone', ''),
                    amount=amount,
                    currency=item.get('currency', data.get('currency', 'USD')),
                    frequency=item.get('frequency', 'once'),
                    payment_method=data.get('payment_method', 'card'),
                    status='completed',
                    notes=data.get('notes', '')
                )
                if appeal:
                    Appeal.objects.filter(id=appeal.id).update(raised_amount=F('raised_amount') + amount)

                created_donations.append(DonationSerializer(donation).data)
                if not first_txn:
                    first_txn = donation.transaction_id
                    first_receipt = donation.receipt_number

            return Response({
                "success": True,
                "message": f"May Allah / God reward you abundantly! Successfully processed {len(created_donations)} donation(s).",
                "receipt_number": first_receipt,
                "transaction_id": first_txn,
                "total_amount": float(total_sum),
                "donations": created_donations
            }, status=status.HTTP_201_CREATED)

        # Single donation flow
        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            donation = serializer.save(status='completed')
            if donation.appeal:
                Appeal.objects.filter(id=donation.appeal.id).update(raised_amount=F('raised_amount') + donation.amount)

            return Response({
                "success": True,
                "message": "May Allah / God reward your generous contribution!",
                "receipt_number": donation.receipt_number,
                "transaction_id": donation.transaction_id,
                "data": DonationSerializer(donation).data
            }, status=status.HTTP_201_CREATED)

        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class VolunteerCreateAPIView(generics.CreateAPIView):
    queryset = Volunteer.objects.all()
    serializer_class = VolunteerSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            volunteer = serializer.save()
            return Response({
                "success": True,
                "message": f"Welcome to our volunteer mission, {volunteer.first_name}! Our team coordinator will connect with you.",
                "data": serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            "success": False,
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
