from django.contrib import admin
from user_management.models import *


admin.site.register(Users)
admin.site.register(UserRoles)
admin.site.register(UserAccountStatus)