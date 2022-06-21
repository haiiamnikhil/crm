from xmlrpc.client import boolean
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.serializer.user_serializer import UserSerializer, UserRoleSerializer
from user_management.models import Users, UserRoles


class PresentUser(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            user = request.user
            user_details = UserSerializer(user,many=False)
            return Response({'success':True, 'user':user_details.data}, status=200)
        except:
            return Response({'success':False}, status=200)

class UserDetails(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, uid):
        userDetails = self.fetch_details(uid)

        return Response({'success':True, 'user':userDetails})

    def fetch_details(self,uid):
        user = Users.objects.get(uid=uid)
        user = UserSerializer(user, many=False)

        return user.data

class UpdateUserAccountStatus(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        params = self.extract_values(request.data)
        try:
            user = Users.objects.filter(uid=params['uid'])
            user.update(is_active=True if params['is_active'] == 'true' else False)
            return Response({'success':True}, status=200)
        except:
            return Response({'success':False}, status=200)

    def extract_values(self,data):
        params = {}
        params['uid'] = data['uid']
        params['is_active'] = data['status']
        
        return params


class PresentUserRole(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user_roles = UserRoles.objects.all()
        roles = UserRoleSerializer(user_roles, many=True)
        return Response({'success':True, 'role':roles.data}, status=200)
