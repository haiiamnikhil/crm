from rest_framework import serializers
from user_management.models import Users


class ListUserSerializer(serializers.ModelSerializer):
    onboarded_by = serializers.CharField()

    class Meta:
        model = Users
        fields = ['email','designation','first_name','last_name','is_active','profile_image','date_joined','onboarded_by','username']

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = [
            'pk','email','designation','first_name','last_name','profile_image','date_joined','username','phone',
            'address','address2','city','country','state','zipcode'
        ]