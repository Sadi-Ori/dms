from django.db import models


class SiteSetting(models.Model):
    site_name = models.CharField(max_length=100, default="Ihsan Global Relief")
    tagline = models.CharField(max_length=255, default="Every Life Deserves Hope, Dignity & Compassion")
    phone = models.CharField(max_length=50, default="+1 (800) 456-7890")
    email = models.EmailField(default="contact@ihsanglobal.org")
    address = models.CharField(max_length=255, default="100 Humanitarian Way, Suite 400, Global City")
    charity_registration = models.CharField(max_length=100, default="Registered 501(c)(3) Nonprofit #84-9281729")
    donation_policy_percentage = models.PositiveIntegerField(default=100, help_text="Percentage of donation directed to field aid")
    announcement_ticker = models.CharField(
        max_length=300,
        default="🚨 URGENT EMERGENCY: Famine crisis alert. Hot meals, clean water, and emergency medical kits needed now. Give with 100% Policy."
    )
    announcement_link = models.CharField(max_length=200, default="/appeals/gaza-emergency")
    primary_color = models.CharField(max_length=20, default="#0284c7")
    secondary_color = models.CharField(max_length=20, default="#0f172a")
    accent_color = models.CharField(max_length=20, default="#f43f5e")

    def __str__(self):
        return self.site_name

    class Meta:
        verbose_name = "Site Setting"
        verbose_name_plural = "Site Settings"


class FAQ(models.Model):
    CATEGORY_CHOICES = [
        ("general", "General"),
        ("zakat", "Zakat & Islamic Giving"),
        ("policy", "100% Donation Policy"),
        ("appeals", "Appeals & Field Work"),
        ("sponsorship", "Orphan & Family Sponsorship"),
    ]

    question = models.CharField(max_length=300)
    answer = models.TextField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default="general")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.question

    class Meta:
        ordering = ["order", "id"]
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"


class AnnualReport(models.Model):
    title = models.CharField(max_length=200)
    year = models.PositiveIntegerField()
    summary = models.TextField()
    file_url = models.URLField(blank=True, default="#")
    beneficiaries_served = models.CharField(max_length=50, default="1,200,000+")
    total_aid_delivered = models.CharField(max_length=50, default="$18,450,000")
    countries_reached = models.PositiveIntegerField(default=32)
    published_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.year})"

    class Meta:
        ordering = ["-year"]


class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_resolved = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"

    class Meta:
        ordering = ["-created_at"]


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.email
