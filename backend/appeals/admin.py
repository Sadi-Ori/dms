from django.contrib import admin
from .models import Category, Appeal, Donation, Volunteer


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(Appeal)
class AppealAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'target_amount', 'raised_amount', 'is_urgent', 'is_zakat_eligible', 'is_featured', 'order')
    list_filter = ('category', 'is_urgent', 'is_zakat_eligible', 'is_featured')
    search_fields = ('title', 'short_description', 'location')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
    list_display = ('receipt_number', 'donor_first_name', 'donor_last_name', 'amount', 'currency', 'frequency', 'status', 'created_at')
    list_filter = ('status', 'frequency', 'currency', 'created_at')
    search_fields = ('receipt_number', 'transaction_id', 'donor_email', 'donor_first_name', 'donor_last_name')


@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'city', 'country', 'availability', 'is_approved', 'created_at')
    list_filter = ('availability', 'is_approved', 'country')
    search_fields = ('first_name', 'last_name', 'email', 'skills')
