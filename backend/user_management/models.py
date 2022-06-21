from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.db.models.signals import post_save
from django.dispatch import receiver

import uuid


DEFAULT_PROFILE_IMAGE = 'default/default-profile.png'
ACCOUNT_STATUS_CHOICES = (
    ('0', 'Invitation Send'),
    ('1', 'Approved'),
    ('2', 'Pending Approval'),
    ('3', 'Pendind Review'),
    ('4', 'Rejected'),
    ('5', 'Terminated')
)


class UserRoles(models.Model):
    role = models.CharField(max_length=100, unique=True, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'User Roles'

    def __str__(self):
        return str(self.role)


class Users(AbstractUser):
    uid = models.UUIDField(unique=True, blank=True,
                           default=uuid.uuid4, null=True)
    email = models.EmailField(_('email address'), unique=True)
    username = models.CharField(
        _('username'), max_length=50, null=True, blank=True, unique=False)
    first_name = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    last_name = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    phone = models.BigIntegerField(unique=False, null=True, blank=True)

    address = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    address2 = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    city = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    state = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    zipcode = models.CharField(
        max_length=100, unique=False, null=True, blank=True)
    country = models.CharField(
        max_length=100, unique=False, null=True, blank=True)

    profile_image = models.ImageField(
        upload_to="img/user/profile-img", default=DEFAULT_PROFILE_IMAGE)
    designation = models.ForeignKey(
        UserRoles, on_delete=models.DO_NOTHING, null=True, blank=True)

    onboarded_by = models.ForeignKey(
        'self', on_delete=models.DO_NOTHING, null=True, blank=True, unique=False, related_name='%(class)s_onboarded_by')
    deleted = models.BooleanField(default=False,null=True, blank=True)

    deleted_by = models.ForeignKey(
        'self', on_delete=models.DO_NOTHING, null=True, blank=True, unique=False, related_name='%(class)s_deleted_by')

    class Meta:
        verbose_name_plural = 'Users'

    def __str__(self):
        if str(self.first_name):
            return str(self.first_name) + " " + str(self.last_name)
        else:
            return str(self.email)


class UserAccountStatus(models.Model):
    user = models.ForeignKey(Users, on_delete=models.CASCADE, null=True, blank=True)
    status = models.CharField(max_length=50, null=True, blank=True,unique=False, choices=ACCOUNT_STATUS_CHOICES, default='0')

    class Meta:
        verbose_name_plural = 'User Account Status'

    def __str__(self):
        return f"{str(self.user.first_name)} {str(self.user.last_name)}"


from entitlements.models import RoleEntitlements, Entitlements

@receiver(post_save, sender=UserRoles)
def generate_user_entitlement(sender, instance=None, created=False, **kwargs):
    if created:
        entitlements = Entitlements.objects.all()
        for entitlement in entitlements:
            RoleEntitlements.objects.create(user_role = instance, entitlement=entitlement,status=False)
    else:pass
