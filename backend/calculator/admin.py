from django.contrib import admin
from .models import Holiday, FundsSetting, Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Product._meta.get_fields()]

@admin.register(Holiday)
class HolidayAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Holiday._meta.get_fields()]


@admin.register(FundsSetting)
class FundsSettingAdmin(admin.ModelAdmin):
    list_display = [field.name for field in FundsSetting._meta.get_fields()]
