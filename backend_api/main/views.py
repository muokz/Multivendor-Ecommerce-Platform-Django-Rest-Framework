from rest_framework import generics,permissions,pagination,viewsets
from . import serializers
from . import models

from django.db import IntegrityError
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class VendorList(generics.ListCreateAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer

class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer

@csrf_exempt
def VendorLogin(request):
    username=request.POST.get('username')
    password=request.POST.get('password')
    user1=authenticate(username=username,password=password)
    if user1:
        vendor=models.Vendor.objects.get(user=user1)
        msg={
            'bool':True,
            'user':user1.username,            
            'id':vendor.id,
        }
    else:
        msg={
            'bool':False,
            'user':'Invalid Login Credentials'
        }
    return JsonResponse(msg)

@csrf_exempt
def VendorRegister(request):
    first_name=request.POST.get('first_name')
    last_name=request.POST.get('last_name')
    username=request.POST.get('username')
    email=request.POST.get('email')
    mobile=request.POST.get('mobile') 
    address=request.POST.get('address')    
    password=request.POST.get('password')
    try:
        user=User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password,
        )
        if user:
            try:
                #Create Customer
                vendor=models.Vendor.objects.create(
                    user=user,
                    mobile=mobile,
                    address=address
                )
                msg={
                    'bool':True,
                    'user':user.id,
                    'vendor':vendor.id,
                    'msg':'Successful registration. Procees to Login'
                }
            except IntegrityError:
                msg={
                    'bool':False,
                    'user':'Phone No. already exists!!'
                }
        else:
            msg={
                'bool':False,
                'user':'Something went wrong'
            }
    except IntegrityError:
            msg={
                'bool':False,
                'user':'Username already exists!!'
            }
    return JsonResponse(msg)

class ProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.ProductCategory.objects.get(id=category)
            qs=qs.filter(category=category)
        if 'fetch_limit' in self.request.GET:
            limit=int(self.request.GET['fetch_limit'])
            qs=qs[:limit]
        return qs

class ProductImgsList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductImageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['product_id']
        qs=qs.filter(product__id=product_id)
        return qs

class ProductImgListDel(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.ProductImage.objects.all()
    serializer_class=serializers.ProductImageSerializer
    
class TagProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag=self.kwargs['tag']
        qs=qs.filter(tags__icontains=tag)
        return qs

class RelatedProductList(generics.ListCreateAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['pk']
        product=models.Product.objects.get(id=product_id)
        qs=qs.filter(category=product.category).exclude(id=product_id)
        return qs
    
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer

class CategoryList(generics.ListCreateAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategorySerializer

class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.ProductCategory.objects.all()
    serializer_class=serializers.CategoryDetailSerializer

class CustomerList(generics.ListCreateAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset=models.User.objects.all()
    serializer_class=serializers.UserSerializer

@csrf_exempt
def CustomerLogin(request):
    username=request.POST.get('username')
    password=request.POST.get('password')
    user=authenticate(username=username,password=password)
    if user:
        customer=models.Customer.objects.get(user=user)
        msg={
            'bool':True,
            'user':user.username,            
            'id':customer.id,
        }
    else:
        msg={
            'bool':False,
            'user':'Invalid Login Credentials'
        }
    return JsonResponse(msg)

@csrf_exempt
def CustomerRegister(request):
    first_name=request.POST.get('first_name')
    last_name=request.POST.get('last_name')
    username=request.POST.get('username')
    email=request.POST.get('email')
    mobile=request.POST.get('mobile')
    password=request.POST.get('password')
    try:
        user=User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password,
        )
        if user:
            try:
                #Create Customer
                customer=models.Customer.objects.create(
                    user=user,
                    mobile=mobile
                )
                msg={
                    'bool':True,
                    'user':user.id,
                    'customer':customer.id,
                    'msg':'Successful registration. Procees to Login'
                }
            except IntegrityError:
                msg={
                    'bool':False,
                    'user':'Phone No. already exists!!'
                }
        else:
            msg={
                'bool':False,
                'user':'Something went wrong'
            }
    except IntegrityError:
            msg={
                'bool':False,
                'user':'Username already exists!!'
            }
    return JsonResponse(msg)

class OrderList(generics.ListCreateAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.OrderSerializer

class OrderItemList(generics.ListCreateAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer

class VendorCustomerOrderItemList(generics.ListAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id=self.kwargs['vendor_id']
        customer_id=self.kwargs['customer_id']
        qs=qs.filter(order__customer__id=customer_id,product__vendor__id=vendor_id)
        return qs
    
class CustomerOrderItemList(generics.ListAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs

class VendorCustomerList(generics.ListAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id=self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs

class VendorOrderItemList(generics.ListAPIView):
    queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id=self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs
    
class OrderDetail(generics.ListAPIView):
   # queryset=models.OrderItems.objects.all()
    serializer_class=serializers.OrderDetailSerializer

    def get_queryset(self):
        order_id=self.kwargs['pk']
        order=models.Order.objects.get(id=order_id)
        order_items=models.OrderItems.objects.filter(order=order)
        return order_items

class OrderModify(generics.RetrieveUpdateAPIView):
    queryset=models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    
class CustomerAdressViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.CustomerAddressSerializer
    queryset=models.CustomerAddress.objects.all()

class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()

@csrf_exempt
def update_order_status(request,order_id):
    if request.method=='POST':
        updateRes=models.Order.objects.filter(id=order_id).update(order_status=True)
        msg={
            'bool':False,
        }
        if updateRes:
            msg={
                'bool':True,
            }
    return JsonResponse(msg)

@csrf_exempt
def delete_customer_orders(request,customer_id):
    if request.method=='DELETE':
        orders=models.Order.objects.filter(customer__id=customer_id).delete()
        msg={
            'bool':False
        }
        if orders:
            msg={
                'bool':True
            }
    return JsonResponse(msg)

@csrf_exempt
def update_product_download_count(request,product_id):
    if request.method=='POST':
        product=models.Product.objects.get(id=product_id)
        totalDownloads=product.downloads
        totalDownloads+=1
        if totalDownloads == 0:
            totalDownloads=1
        updateRes=models.Product.objects.filter(id=product_id).update(downloads=totalDownloads)
        msg={
            'bool':False,
        }
        if updateRes:
            msg={
                'bool':True,
            }
    return JsonResponse(msg)

#Wishlist
class WishList(generics.ListCreateAPIView):
    queryset=models.Wishlist.objects.all()
    serializer_class=serializers.WishlistSerializer

@csrf_exempt
def check_in_wishlist(request):
    if request.method=='POST':
        product_id=request.POST.get('product')
        customer_id=request.POST.get('customer')
        checkWishlist=models.Wishlist.objects.filter(product_id=product_id,customer_id=customer_id).count()
        msg={
            'bool':False
        }
        if checkWishlist > 0:
            msg={
                'bool':True
            }
    return JsonResponse(msg)

class WishItemList(generics.ListAPIView):
    queryset=models.Wishlist.objects.all()
    serializer_class=serializers.WishlistSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id)
        return qs
    
@csrf_exempt
def remove_from_wishlist(request):
    if request.method=='POST':
        wishlist_id=request.POST.get('wishlist_id')
        res=models.Wishlist.objects.filter(id=wishlist_id).delete()
        msg={
            'bool':False
        }
        if res:
            msg={
                'bool':True
            }
    return JsonResponse(msg)

class CustomerAdressList(generics.ListAPIView):
    queryset=models.CustomerAddress.objects.all()
    serializer_class=serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id)
        return qs

@csrf_exempt
def mark_default_address(request,pk):
    if request.method=='POST':
        address_id=request.POST.get('address_id')
        models.CustomerAddress.objects.update(default_address=False)
        res=models.CustomerAddress.objects.filter(id=address_id).update(default_address=True)
        msg={
            'bool':False
        }
        if res:
            msg={
                'bool':True
            }
    return JsonResponse(msg)

@csrf_exempt
def customer_dashboard(request,pk):
    customer_id=pk
    totalAddress=models.CustomerAddress.objects.filter(customer__id=customer_id).count()
    totalWishlist=models.Wishlist.objects.filter(customer__id=customer_id).count()
    totalOrders=models.Order.objects.filter(customer__id=customer_id).count()
    msg={
        'totalAddress':totalAddress,
        'totalWishlist':totalWishlist,
        'totalOrders':totalOrders,
    }
    return JsonResponse(msg)

