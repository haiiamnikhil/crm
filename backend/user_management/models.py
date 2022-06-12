from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


DEFAULT_PROFILE_IMAGE = 'default/default-profile.png'

class Users(AbstractUser):
    email = models.EmailField(_('email address'),unique=True)
    username = models.CharField(_('username'), max_length=50, null=True, blank=True, unique=False)
    first_name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    last_name = models.CharField(max_length=100, unique=False, null=True, blank=True)
    phone = models.BigIntegerField(unique=False, null=True, blank=True)

    address = models.CharField(max_length=100, unique=False, null=True, blank=True)
    address2 = models.CharField(max_length=100, unique=False, null=True, blank=True)
    city = models.CharField(max_length=100, unique=False, null=True, blank=True)
    state = models.CharField(max_length=100, unique=False, null=True, blank=True)
    zipcode = models.CharField(max_length=100, unique=False, null=True, blank=True)
    country = models.CharField(max_length=100, unique=False, null=True, blank=True)

    profile_image = models.ImageField(upload_to="img/user/profile-img", default=DEFAULT_PROFILE_IMAGE)
    designation = models.CharField(max_length=50, unique=False, null=True, blank=True)

    onboarded_by = models.ForeignKey('self', on_delete=models.DO_NOTHING,null=True,blank=True,unique=False)

    class Meta:
        verbose_name_plural = 'Users'

    def __str__(self):
        if str(self.first_name):
            return str(self.first_name) + " " + str(self.last_name)
        else:
            return str(self.email)