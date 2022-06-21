from rest_framework import serializers
from user_management.models import Users, UserRoles


class ListUserSerializer(serializers.ModelSerializer):
    onboarded_by = serializers.CharField()
    designation = serializers.CharField()
    deleted_by = serializers.CharField()

    class Meta:
        model = Users
        fields = ['email','designation','first_name','last_name','is_active','profile_image','date_joined','onboarded_by','username','uid','deleted_by']

class UserSerializer(serializers.ModelSerializer):
    designation = serializers.CharField()
    class Meta:
        model = Users
        fields = [
            'pk','uid','email','designation','first_name','last_name','profile_image','date_joined','username','phone',
            'address','address2','city','country','state','zipcode','is_active'
        ]

class UserRoleSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserRoles
        fields = '__all__'