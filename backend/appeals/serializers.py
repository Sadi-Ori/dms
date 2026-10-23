from rest_framework import serializers
from .models import Category, Appeal, Donation, Volunteer


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class AppealSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    percentage_raised = serializers.ReadOnlyField()

    class Meta:
        model = Appeal
        fields = '__all__'


class DonationSerializer(serializers.ModelSerializer):
    appeal_title = serializers.ReadOnlyField(source='appeal.title')

    class Meta:
        model = Donation
        fields = '__all__'
        read_only_fields = ('transaction_id', 'receipt_number', 'status', 'created_at')


class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = '__all__'
        read_only_fields = ('is_approved', 'created_at')
