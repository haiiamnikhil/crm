from django.contrib import admin

from entitlements.models import Entitlements, RoleEntitlements


admin.site.register(Entitlements)
admin.site.register(RoleEntitlements)