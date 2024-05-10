from django.urls import path
from calculator import views

urlpatterns = [
    # path(r'^api/products$', views.product_list),
    # path('', views.product_list),
    path("api/products/", views.product_list, name="product_list"),
]
