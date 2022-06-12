from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response

from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator

from user_management.models import Users
from user_management.serializer.user_serializer import ListUserSerializer


class ListUsers(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = self.get_userlist()
        return Response({'success': True,'data':users})

    def get_userlist(self):
        users = Users.objects.all()
        userserialized = ListUserSerializer(users, many=True)
        return userserialized.data