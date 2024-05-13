from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name', 'days_lte', 'days_gt', 'days_lte_reinvest', 'days_gt_reinvest')


class ProductShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id', 'name')


class InvestmentRequestSerializer(serializers.Serializer):
    producto = serializers.IntegerField()
    enReinversion = serializers.BooleanField()
    plazo = serializers.IntegerField()
    fechaCreacion = serializers.DateTimeField()


class InvestmentResponseSerializer(serializers.Serializer):
    producto = serializers.IntegerField()
    plazo = serializers.IntegerField()
    fechaInicio = serializers.DateTimeField()
    fechaFin = serializers.DateTimeField()
    plazoReal = serializers.IntegerField()
