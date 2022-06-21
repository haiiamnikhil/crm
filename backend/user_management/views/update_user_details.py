from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import Users, UserRoles
from user_management import models


class UpdateUserDetails(generics.UpdateAPIView):
    permission_classes = (IsAuthenticated,)

    def put(self, request):
        params = self.extract_values(request)
        try:
            uid = params.pop('uid')
            user, created = Users.objects.update_or_create(uid=uid, defaults=params)
            return Response({'success': True}, status=200)
        except Exception as e:
            print(e)
            return Response({'success': False}, status=200)

    def extract_values(self, request):
        params = {}
        for key, value in request.data.items():
            if key == 'profile_image':
                params[key] = request.FILES.get('profile_image')
            elif key == 'designation':
                user_role = UserRoles.objects.get(role=value)
                params['designation'] = user_role
            else:
                params[key] = value

        return params
