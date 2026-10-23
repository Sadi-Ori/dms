from rest_framework import serializers
from .models import NisabRate, ZakatCalculation


class NisabRateSerializer(serializers.ModelSerializer):
    nisab_threshold_value = serializers.ReadOnlyField()

    class Meta:
        model = NisabRate
        fields = '__all__'


class ZakatCalculationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ZakatCalculation
        fields = '__all__'
        read_only_fields = ('net_zakatable_wealth', 'nisab_threshold', 'is_zakat_due', 'zakat_payable', 'created_at')
