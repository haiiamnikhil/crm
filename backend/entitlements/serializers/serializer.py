from rest_framework import serializers
from entitlements.models import Entitlements,RoleEntitlements


class UserRoleEntitlementsSerializer(serializers.ModelSerializer):
    user_role = serializers.CharField()
    entitlement = serializers.CharField()

    class Meta:
        model = RoleEntitlements
        fields = '__all__'


class ListEntitlementsSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Entitlements
        fields = '__all__'