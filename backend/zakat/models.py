from django.db import models


class NisabRate(models.Model):
    METAL_CHOICES = [
        ("gold", "Gold (87.48 grams)"),
        ("silver", "Silver (612.36 grams)"),
    ]

    metal = models.CharField(max_length=20, choices=METAL_CHOICES, unique=True)
    price_per_gram = models.DecimalField(max_digits=10, decimal_places=2, help_text="Market price per gram in USD")
    nisab_grams = models.DecimalField(max_digits=8, decimal_places=2, default=87.48)
    currency = models.CharField(max_length=10, default="USD")
    last_updated = models.DateTimeField(auto_now=True)

    @property
    def nisab_threshold_value(self):
        return round(self.price_per_gram * self.nisab_grams, 2)

    def __str__(self):
        return f"{self.get_metal_display()}: {self.currency} {self.nisab_threshold_value}"


class ZakatCalculation(models.Model):
    cash_in_hand = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    bank_deposits = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    gold_value = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    silver_value = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    shares_stocks = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    business_cash_inventory = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    money_owed_to_you = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    
    # Deductions
    debts_due_now = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    immediate_expenses = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)

    # Computed fields
    net_zakatable_wealth = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    nisab_used = models.CharField(max_length=20, default="silver")
    nisab_threshold = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    is_zakat_due = models.BooleanField(default=False)
    zakat_payable = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    currency = models.CharField(max_length=10, default="USD")
    created_at = models.DateTimeField(auto_now_add=True)

    def calculate(self, silver_rate=0.85, gold_rate=75.00):
        total_assets = (
            self.cash_in_hand + self.bank_deposits + self.gold_value +
            self.silver_value + self.shares_stocks + self.business_cash_inventory +
            self.money_owed_to_you
        )
        total_deductions = self.debts_due_now + self.immediate_expenses
        self.net_zakatable_wealth = max(0, total_assets - total_deductions)

        # Standard silver nisab: 612.36g * silver_rate
        threshold = round(612.36 * silver_rate, 2)
        self.nisab_threshold = threshold

        if self.net_zakatable_wealth >= threshold:
            self.is_zakat_due = True
            self.zakat_payable = round(float(self.net_zakatable_wealth) * 0.025, 2)
        else:
            self.is_zakat_due = False
            self.zakat_payable = 0.00
        return self.zakat_payable

    def __str__(self):
        return f"Calculation #{self.id} - Zakat: {self.currency} {self.zakat_payable}"

    class Meta:
        ordering = ["-created_at"]
