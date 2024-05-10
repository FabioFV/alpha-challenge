from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'days_lte', 'days_gt', 'days_lte_reinvest', 'days_gt_reinvest')
