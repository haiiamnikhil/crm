from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import Users


class RecoverUser(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        params = self.extract_values(request.data)
        try:
            user = Users.objects.get(uid=params['uid'])
            user.deleted = False
            user.is_active = True
            user.save()
            return Response({'success':True},status=200)
        except Exception as e:
            print(e)
            return Response({'success':False},status=200)

    def extract_values(self, data):
        params = {}
        for key, value in data.items():
            params[key] = value
        
        return params