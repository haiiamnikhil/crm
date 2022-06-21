from django.db import models
from user_management.models import UserRoles

from user_management.models import Users


class Entitlements(models.Model):
    name = models.CharField(max_length=50, unique=False, blank=True, null=True)
    value = models.CharField(max_length=50, unique=False, null=True, blank=True)

    class Meta:
        verbose_name_plural = "Entitlements"

    def __str__(self):
        return self.name


class RoleEntitlements(models.Model):
    user_role = models.ForeignKey(UserRoles, null=True, on_delete=models.CASCADE, blank=True)
    entitlement = models.ForeignKey(Entitlements, unique=False, blank=True, on_delete=models.CASCADE, null=True)
    status = models.BooleanField(default=False,null=True,blank=True)

    class Meta:
        verbose_name_plural = 'Role Entitlements'

    def __str__(self):
        return str(self.user_role)