from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from calculator.models import Product
from calculator.serializers import ProductSerializer, ProductShortSerializer, InvestmentRequestSerializer, \
    InvestmentResponseSerializer
from calculator.service import CalculatorService


@api_view(['GET'])
def product_list(request):
    products = Product.objects.filter(enabled=True)
    product_serializer = ProductSerializer(products, many=True)
    return JsonResponse(product_serializer.data, safe=False)


@api_view(['GET'])
def product_short_list(request):
    products = Product.objects.filter(enabled=True)
    product_serializer = ProductShortSerializer(products, many=True)
    return JsonResponse(product_serializer.data, safe=False)


@api_view(['POST'])
def calculate(request):
    invesment_data = JSONParser().parse(request)
    investment_serializer = InvestmentRequestSerializer(data=invesment_data)
    if investment_serializer.is_valid():
        try:
            data = CalculatorService(investment_serializer.data).calculate()
            serializer = InvestmentResponseSerializer(data=data)

            if serializer.is_valid():
                return JsonResponse(serializer.validated_data)
            else:
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Product.DoesNotExist:
            return JsonResponse({'message': 'El producto no existe.'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return JsonResponse(investment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

