# Generated by Django 5.0.7 on 2024-08-15 07:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0019_product_demo_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='product_file',
            field=models.FileField(null=True, upload_to='product_files/'),
        ),
    ]
