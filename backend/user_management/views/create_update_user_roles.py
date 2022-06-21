from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import UserRoles


class AddUserRoles(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        params = self.extract_values(request.data)
        userRoles = params['role'].split(',')
        if len(userRoles) > 1:
            for role in userRoles:
                role, created = UserRoles.objects.update_or_create(role=role,defaults={'role':role})
        else:
            role, created = UserRoles.objects.update_or_create(role=userRoles[0],defaults={'role':userRoles[0]})

        return Response({'success':True}, status=200)

    def extract_values(self, data):
        params = {}
        try:
            for key, value in data.items():
                params[key] = value
            return params
        except Exception as e:
            print(e)
        
class UpdateUserRoles(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        params = self.extract_values(request.data)
        try:
            userRoles = params['role'].split(',')
            for role_id in userRoles:
                UserRoles.objects.filter(pk=role_id).delete()
            return Response({'success':True}, status=200)

        except Exception as e:
            print(e)
            return Response({'success':False}, status=200)
    
    def extract_values(self, data):
        params = {}
        for key, value in data.items():
            params[key] = value
    
        return params