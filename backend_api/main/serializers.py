from rest_framework import serializers
from django.contrib.auth.models import User
from . import models

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id', 'user','address','profile_img','categories']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self). __init__(*args, **kwargs)
    
    def to_representation(self, instance):
      response= super().to_representation(instance)
      response['user']=UserSerializer(instance.user).data
      return response

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id', 'user','mobile','profile_img','address','show_chart_daily_orders','show_chart_monthly_orders','show_chart_yearly_orders','total_products']

    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer, self). __init__(*args, **kwargs)
        # self.Meta.depth = 1
    
    def to_representation(self, instance):
      response= super().to_representation(instance)
      response['user']=UserSerializer(instance.user).data
      return response

class ProductListSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    class Meta:
        model=models.Product
        fields=['id', 'category','vendor','title','slug','tag_list','detail','price','usd_price','product_ratings','image','product_file','tags','publish_status']

    def __init__(self, *args, **kwargs):
        super(ProductListSerializer, self). __init__(*args, **kwargs)
        # self.Meta.depth = 1

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductImage
        fields=['id', 'product','image']

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True, read_only=True)
    product_imgs=ProductImageSerializer(many=True, read_only=True)
    class Meta:
        many = True
        model=models.Product
        fields=['id', 'category','vendor','title','slug','tag_list','detail','price','usd_price','product_ratings','product_imgs','image','product_file','downloads','publish_status','tags']

    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self). __init__(*args, **kwargs)
        # self.Meta.depth = 1
    
    def to_representation(self, instance):
      response= super().to_representation(instance)
      response['vendor']=VendorDetailSerializer(instance.vendor).data
      return response

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductCategory
        fields=['id', 'title','detail','total_downloads','cat_img']

    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self). __init__(*args, **kwargs)
        # self.Meta.depth = 1

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductCategory
        fields=['id', 'title','detail']

    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer, self). __init__(*args, **kwargs)
        # self.Meta.depth = 1        

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id', 'first_name','last_name', 'username','email']

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id', 'user','mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self). __init__(*args, **kwargs)
        self.Meta.depth = 1

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id', 'user','mobile','profile_img','customer_orders']
    
    def to_representation(self, instance):
      response= super().to_representation(instance)
      response['user']=UserSerializer(instance.user).data
      return response

class OrderSerializer(serializers.ModelSerializer):
  class Meta:
     model = models.Order
     fields = ['id', 'customer', 'order_status', 'total_amount', 'total_usd_amount']    
  
  def __init__(self, *args, **kwargs):
        super(OrderSerializer, self). __init__(*args, **kwargs)
        #self.Meta.depth = 1

  def to_representation(self, instance):
        response= super().to_representation(instance)
        response['customer']=CustomerSerializer(instance.customer).data
        return response

class OrderItemSerializer(serializers.ModelSerializer):
  class Meta:
     model = models.OrderItems
     fields = ['id', 'order', 'product', 'qty', 'price', 'usd_price']   

  def to_representation(self, instance):
      response= super().to_representation(instance)
      response['order']=OrderSerializer(instance.order).data
      response['customer']=CustomerSerializer(instance.order.customer).data
      response['user']=UserSerializer(instance.order.customer.user).data
      response['product']=ProductDetailSerializer(instance.product).data
      return response

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id', 'order','product']

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self). __init__(*args, **kwargs)
        self.Meta.depth = 1

class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CustomerAddress
        fields=['id', 'customer','address','default_address']


class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductRating
        fields=['id', 'customer','product','rating','reviews','add_time']

    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer, self). __init__(*args, **kwargs)
        
    def to_representation(self, instance):
      response= super().to_representation(instance)
      response['customer']=CustomerSerializer(instance.customer).data
      return response

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Wishlist
        fields=['id', 'product','customer']

    def __init__(self, *args, **kwargs):
        super(WishlistSerializer, self). __init__(*args, **kwargs)

    def to_representation(self, instance):
      response= super().to_representation(instance)
      response['customer']=CustomerSerializer(instance.customer).data
      response['product']=ProductDetailSerializer(instance.product).data
      return response
