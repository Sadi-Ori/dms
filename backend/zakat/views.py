from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from decimal import Decimal

from .models import NisabRate, ZakatCalculation
from .serializers import NisabRateSerializer, ZakatCalculationSerializer


class NisabRatesAPIView(APIView):
    def get(self, request):
        gold = NisabRate.objects.filter(metal='gold').first()
        silver = NisabRate.objects.filter(metal='silver').first()

        # Seed defaults if not present
        if not gold:
            gold = NisabRate.objects.create(
                metal='gold',
                price_per_gram=Decimal('78.50'),
                nisab_grams=Decimal('87.48'),
                currency='USD'
            )
        if not silver:
            silver = NisabRate.objects.create(
                metal='silver',
                price_per_gram=Decimal('0.95'),
                nisab_grams=Decimal('612.36'),
                currency='USD'
            )

        return Response({
            "gold": NisabRateSerializer(gold).data,
            "silver": NisabRateSerializer(silver).data,
            "recommended_standard": "silver",
            "silver_threshold": float(silver.nisab_threshold_value),
            "gold_threshold": float(gold.nisab_threshold_value),
            "currency": "USD"
        })


class ZakatCalculateAPIView(APIView):
    def post(self, request):
        data = request.data
        try:
            calc = ZakatCalculation(
                cash_in_hand=Decimal(str(data.get('cash_in_hand', '0') or '0')),
                bank_deposits=Decimal(str(data.get('bank_deposits', '0') or '0')),
                gold_value=Decimal(str(data.get('gold_value', '0') or '0')),
                silver_value=Decimal(str(data.get('silver_value', '0') or '0')),
                shares_stocks=Decimal(str(data.get('shares_stocks', '0') or '0')),
                business_cash_inventory=Decimal(str(data.get('business_cash_inventory', '0') or '0')),
                money_owed_to_you=Decimal(str(data.get('money_owed_to_you', '0') or '0')),
                debts_due_now=Decimal(str(data.get('debts_due_now', '0') or '0')),
                immediate_expenses=Decimal(str(data.get('immediate_expenses', '0') or '0')),
                currency=data.get('currency', 'USD')
            )

            # Get current silver rate
            silver_rate_obj = NisabRate.objects.filter(metal='silver').first()
            silver_price = float(silver_rate_obj.price_per_gram) if silver_rate_obj else 0.95

            calc.calculate(silver_rate=silver_price)
            calc.save()

            return Response({
                "success": True,
                "net_zakatable_wealth": float(calc.net_zakatable_wealth),
                "nisab_threshold": float(calc.nisab_threshold),
                "is_zakat_due": calc.is_zakat_due,
                "zakat_payable": float(calc.zakat_payable),
                "currency": calc.currency,
                "message": (
                    f"Your Zakat obligation is {calc.currency} {calc.zakat_payable:,.2f}."
                    if calc.is_zakat_due else
                    f"Your net wealth ({calc.currency} {calc.net_zakatable_wealth:,.2f}) is below the Nisab threshold ({calc.currency} {calc.nisab_threshold:,.2f}). Zakat is not obligatory, but Sadaqah is always virtuous."
                )
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "success": False,
                "error": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)
