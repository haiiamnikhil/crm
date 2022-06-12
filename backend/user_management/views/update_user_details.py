from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import Users
from user_management import models

class UpdateUserDetails(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        params = self.extract_values(request)
        try:
            pk = params.pop('pk')
            print(params)
            user = Users.objects.filter(pk=pk).update(**params)

            return Response({'success':True}, status=200)
        except Exception as e:
            print(e)
            return Response({'success':False},status=200)

    def extract_values(self, request):
        params = {}
        for key, value in request.data.items():
            if key == 'profile_image':
                params[key] = request.FILES.get('profile_image') if request.FILES.get('profile_image') != None else models.DEFAULT_PROFILE_IMAGE
            else:
                params[key] = value

        return params