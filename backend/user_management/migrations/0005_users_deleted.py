# Generated by Django 4.0.5 on 2022-06-21 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_management', '0004_alter_useraccountstatus_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='users',
            name='deleted',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]