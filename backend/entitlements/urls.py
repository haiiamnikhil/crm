from django.urls import path
from entitlements.views import entitlements

urlpatterns = [
    path('user/entitlemets/', entitlements.UserEntitlemets.as_view(), name='add_user_entitlements'),
    path('user/role-entitlemets/', entitlements.GetUserRoleEntitlements.as_view(), name='get_user_role_entitlements'),
    path('user/update-entitlemets/', entitlements.UpdateUserRoleEntitlement.as_view(), name='update_user_role_entitlements'),
]