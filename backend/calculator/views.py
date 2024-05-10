from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from calculator.models import Product
from calculator.serializers import ProductSerializer


@api_view(['GET'])
def product_list(request):
    products = Product.objects.filter(enabled=True)
    product_serializer = ProductSerializer(products, many=True)
    return JsonResponse(product_serializer.data, safe=False)