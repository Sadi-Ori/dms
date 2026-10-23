from django.contrib import admin
from .models import NisabRate, ZakatCalculation


@admin.register(NisabRate)
class NisabRateAdmin(admin.ModelAdmin):
    list_display = ('metal', 'price_per_gram', 'nisab_grams', 'currency', 'nisab_threshold_value', 'last_updated')


@admin.register(ZakatCalculation)
class ZakatCalculationAdmin(admin.ModelAdmin):
    list_display = ('id', 'net_zakatable_wealth', 'nisab_threshold', 'is_zakat_due', 'zakat_payable', 'currency', 'created_at')
    list_filter = ('is_zakat_due', 'currency', 'created_at')
