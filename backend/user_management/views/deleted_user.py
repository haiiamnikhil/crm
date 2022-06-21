from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import Users
from user_management.serializer.user_serializer import ListUserSerializer


class GetDeletedUser(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        users = self.get_userlist()
        return Response({'success': True, 'data': users})

    def get_userlist(self):
        users = Users.objects.filter(deleted=True)
        userserialized = ListUserSerializer(users, many=True)
        return userserialized.data