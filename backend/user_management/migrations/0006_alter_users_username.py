# Generated by Django 4.0.5 on 2022-06-02 14:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0005_alter_users_profile_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='username',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='username'),
        ),
    ]