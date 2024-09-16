from django.contrib import admin
from . import models

admin.site.register(models.Vendor)
admin.site.register(models.ProductCategory)

class CustomerAdmin(admin.ModelAdmin):
    list_display=['get_username','mobile']
    def get_username(self,obj):
        return obj.user.username
admin.site.register(models.Customer,CustomerAdmin)

admin.site.register(models.CustomerAddress)
admin.site.register(models.ProductRating)

#product images
admin.site.register(models.ProductImage)

class ProductImagesInline(admin.StackedInline):
    model = models.ProductImage

class ProductAdmin(admin.ModelAdmin):
    list_display=['title','price','usd_price','downloads']
    list_editable=['usd_price']
    prepopulated_fields={'slug':('title',)}
    inlines = [
        ProductImagesInline,
    ]
admin.site.register(models.Product,ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display=['id', 'customer', 'order_time', 'total_amount', 'total_usd_amount', 'order_status','payment_mode','trans_ref']
admin.site.register(models.Order,OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    list_display=['id', 'order', 'product', 'qty','price','usd_price']
admin.site.register(models.OrderItems,OrderItemAdmin)

class WishlistAdmin(admin.ModelAdmin):
    list_display=['id', 'product', 'customer']
admin.site.register(models.Wishlist,WishlistAdmin)