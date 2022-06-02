from rest_framework import serializers
from user_management.models import Users


class ListUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'