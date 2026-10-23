from django.db import models
from django.utils.text import slugify
import uuid


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=120, unique=True, blank=True)
    icon_name = models.CharField(max_length=50, default="heart")
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ["order", "name"]
        verbose_name_plural = "Categories"


class Appeal(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(Category, related_name="appeals", on_delete=models.CASCADE)
    short_description = models.CharField(max_length=350)
    full_story = models.TextField()
    featured_image = models.URLField(
        default="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
    )
    target_amount = models.DecimalField(max_digits=12, decimal_places=2, default=100000.00)
    raised_amount = models.DecimalField(max_digits=12, decimal_places=2, default=64500.00)
    is_urgent = models.BooleanField(default=False)
    is_zakat_eligible = models.BooleanField(default=True)
    is_featured = models.BooleanField(default=False)
    location = models.CharField(max_length=100, default="Gaza, Palestine")
    impact_metric = models.CharField(max_length=100, default="Feeds 1 family for 1 month ($85)")
    preset_amounts = models.JSONField(default=list, blank=True, help_text="List of preset numbers, e.g. [50, 85, 200, 500]")
    order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def percentage_raised(self):
        if self.target_amount > 0:
            return min(100, round((float(self.raised_amount) / float(self.target_amount)) * 100))
        return 0

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.preset_amounts:
            self.preset_amounts = [50, 100, 250, 500]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["order", "-created_at"]


class Donation(models.Model):
    FREQUENCY_CHOICES = [
        ("once", "Give Once"),
        ("monthly", "Give Monthly"),
    ]
    STATUS_CHOICES = [
        ("completed", "Completed"),
        ("pending", "Pending"),
        ("failed", "Failed"),
    ]

    appeal = models.ForeignKey(Appeal, related_name="donations", on_delete=models.SET_NULL, null=True, blank=True)
    donor_first_name = models.CharField(max_length=100)
    donor_last_name = models.CharField(max_length=100)
    donor_email = models.EmailField()
    donor_phone = models.CharField(max_length=50, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="USD")
    frequency = models.CharField(max_length=20, choices=FREQUENCY_CHOICES, default="once")
    is_anonymous = models.BooleanField(default=False)
    payment_method = models.CharField(max_length=50, default="card")
    transaction_id = models.CharField(max_length=100, unique=True, blank=True)
    receipt_number = models.CharField(max_length=50, unique=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="completed")
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.transaction_id:
            self.transaction_id = f"TXN-{uuid.uuid4().hex[:12].upper()}"
        if not self.receipt_number:
            self.receipt_number = f"REC-{uuid.uuid4().hex[:8].upper()}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.currency} {self.amount} by {self.donor_first_name} ({self.receipt_number})"

    class Meta:
        ordering = ["-created_at"]


class Volunteer(models.Model):
    AVAILABILITY_CHOICES = [
        ("weekends", "Weekends Only"),
        ("weekdays", "Weekdays"),
        ("full_time", "Full Time"),
        ("emergency_relief", "Emergency Deployment / On Call"),
    ]

    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=50)
    city = models.CharField(max_length=100)
    country = models.CharField(max_length=100, default="United States")
    availability = models.CharField(max_length=50, choices=AVAILABILITY_CHOICES, default="weekends")
    skills = models.CharField(max_length=255, help_text="e.g. Medical, Logistics, Social Media, Fundraising")
    motivation = models.TextField()
    is_approved = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Volunteer: {self.first_name} {self.last_name} ({self.city})"

    class Meta:
        ordering = ["-created_at"]
