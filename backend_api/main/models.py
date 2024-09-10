from django.db import models
from django.contrib.auth.models import User

# Vendor Models
class Vendor(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField(unique=True,null=True)
    profile_img=models.ImageField(upload_to='seller_imgs/',null=True)
    address=models.TextField(null=True)

    def __str__(self):
        return self.user.username

# Product Category
class ProductCategory(models.Model):
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural='Product Category'

# Product
class Product(models.Model):
    category=models.ForeignKey(ProductCategory, on_delete=models.SET_NULL,null=True,related_name='category_product')
    vendor=models.ForeignKey(Vendor, on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=200)
    slug=models.CharField(max_length=300,unique=True,null=True)
    detail=models.TextField(null=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    usd_price=models.DecimalField(max_digits=10,decimal_places=2,default=80)
    tags=models.TextField(null=True)
    image=models.ImageField(upload_to='product_imgs/',null=True)
    demo_url=models.URLField(null=True,blank=True)
    product_file=models.FileField(upload_to='product_files/',null=True)
    downloads=models.IntegerField(default=0,null=True)
    publish_status=models.BooleanField(default=False, null=False)

    def __str__(self):
        return self.title
    
    def tag_list(self):
        tagList=self.tags.split(',')
        return tagList

# Customer Model
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField(unique=True)
    profile_img=models.ImageField(upload_to='customer_imgs/',null=True)

    def __str__(self):
        return self.user.username

# Order Model
class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_orders')
    order_time=models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False)
    total_amount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    total_usd_amount=models.DecimalField(max_digits=10,decimal_places=2,default=0)

    def __str__(self):
        return '%s' % (self.order_time) 
    
# Order Items Model
class OrderItems(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='order_items')
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    usd_price=models.DecimalField(max_digits=10,decimal_places=2,default=0)

    def __str__(self):
        return self.product.title
    
    class Meta:
        verbose_name_plural='Order Items'

# Customer Address Model
class CustomerAddress(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_addresses')
    address=models.TextField()
    default_address=models.BooleanField(default=True)

    def __str__(self):
        return self.address
    
    class Meta:
        verbose_name_plural='Customer Addresses'

# Order Rating and Reviews Model
class ProductRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='rating_customers')
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_ratings')
    rating=models.IntegerField()
    reviews=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.rating} - {self.reviews}'

# Order Address Model
class ProductImage(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_imgs')
    image=models.ImageField(upload_to='product_imgs/',null=True)

    def __str__(self):
        return self.image.url
    
# Wishlist Model
class Wishlist(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE) 
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE)
   
    class Meta:
        verbose_name_plural='Wish List'

    def __str__(self):
        return f"{self.product.title} - {self.customer.user.first_name}"