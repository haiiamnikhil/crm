import json
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from entitlements.models import Entitlements, RoleEntitlements
from entitlements.serializers.serializer import ListEntitlementsSerializer, UserRoleEntitlementsSerializer
from user_management.models import Users
from autherization.user.permissions import AllowUser


class UserEntitlemets(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        ent = Entitlements.objects.all()
        entSerialized = ListEntitlementsSerializer(ent, many=True)
        return Response({'success':True, 'data':entSerialized.data}, status=200)

    def post(self, request):
        params = self.extract_values(request.data)
        user = params.pop('user')
        user_ent = self.create_or_update_user_ent(user,params)
        return Response({'success':True},status=200)

    def extract_values(self,data):
        params = {}
        for key, value in data.items():
            params[key] = value
        params['user'] = data['user']
        return params

    def create_or_update_user_ent(self, user, data):
        user = Users.objects.get(username=user)
        for key, value in data.items():
            entitlement = Entitlements.objects.get(pk=key)
            # ent, created = UserEntitlements.objects.update_or_create(user=user,entitlemets=entitlement, status=True if value == 'true' else False)

        # return ent

class GetUserRoleEntitlements(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        ent = RoleEntitlements.objects.all()
        entSerialized = UserRoleEntitlementsSerializer(ent,many=True)
        return Response({'success':True,'data':entSerialized.data},status=200)


class UpdateUserRoleEntitlement(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,AllowUser,)

    def put(self, request):
        params = self.extract_values(request.data)
        try:
            ent = json.loads(params['role'])
            for id,status in ent.items():
                RoleEntitlements.objects.update_or_create(pk=int(id),defaults={'status':status})
            return Response({'success':True},status=200)

        except Exception as e:
            print(e)
            return Response({'success':False},status=200)

    def extract_values(self, data):
        params = {}
        for key, value in data.items():
            params[key] = value
        return params