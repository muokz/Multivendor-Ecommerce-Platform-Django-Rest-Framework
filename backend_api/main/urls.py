from django.urls import path 
from . import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register('address',views.CustomerAdressViewSet)
router.register('productrating',views.ProductRatingViewSet)

urlpatterns = [
    path('vendors/', views.VendorList.as_view()),
    path('vendor/<int:pk>/', views.VendorDetail.as_view()),
    path('vendor/register/', views.VendorRegister,name='vendor'),
    path('vendor/login/', views.VendorLogin,name='vendor'),
    path('vendor/<int:pk>/orderitems/', views.VendorOrderItemList.as_view()),
    path('vendor/<int:pk>/customers/', views.VendorCustomerList.as_view()),
    path('vendor/<int:vendor_id>/customer/<int:customer_id>/orderitems/', views.VendorCustomerOrderItemList.as_view()),
    path('vendor/<int:pk>/dashboard/', views.vendor_dashboard,name='vendor_dashboard'),
    path('vendor-change-password/<int:vendor_id>/', views.vendor_change_password,name='vendor_change_password'),
    path('vendor-products/<int:vendor_id>/', views.VendorProductList.as_view()),


    path('products/', views.ProductList.as_view()),
    path('products/<str:tag>/', views.TagProductList.as_view()),  
    path('product/<int:pk>/', views.ProductDetail.as_view()),   
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),   
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()),
    path('product-imgs/', views.ProductImgsList.as_view()),
    path('product-img/<int:pk>/', views.ProductImgListDel.as_view()),

    path('customers/', views.CustomerList.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path('customer/login/', views.CustomerLogin,name='customer'),
    path('customer/register/', views.CustomerRegister,name='customer'),
    path('customer-change-password/<int:customer_id>/', views.customer_change_password,name='customer_change_password'),

    path('orders/', views.OrderList.as_view()),
    path('order/<int:pk>/', views.OrderDetail.as_view()),
    path('orderitems/', views.OrderItemList.as_view()),
    path('customer/<int:pk>/orderitems/', views.CustomerOrderItemList.as_view()),
    path('update-order-status/<int:order_id>', views.update_order_status,name='update_order_status'),
    path('update_product_download_count/<int:product_id>', views.update_product_download_count,name='update_product_download_count'),
    path('order-modify/<int:pk>', views.OrderModify.as_view()),
    path('delete-customer-orders/<int:customer_id>', views.delete_customer_orders,name='delete_customer_orders'),
    
    
    path('mpesa/<int:customer_id>/', views.mpesapay,name='mpesapay'),

    
    path('wishlist/', views.WishList.as_view()),
    path('check-in-wishlist/', views.check_in_wishlist,name='check_in_wishlist'),
    path('remove-from-wishlist/', views.remove_from_wishlist,name='remove_from_wishlist'),
    path('customer/<int:pk>/wishitems/', views.WishItemList.as_view()),
    path('customer/<int:pk>/address-list/', views.CustomerAdressList.as_view()),

    
    path('mark-default-address/<int:pk>/', views.mark_default_address,name='mark_default_address'),
    path('customer/dashboard/<int:pk>/', views.customer_dashboard,name='customer_dashboard'),
    
]

urlpatterns+=router.urls