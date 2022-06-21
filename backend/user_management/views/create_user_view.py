from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import Users, UserRoles
from user_management.serializer.user_serializer import UserRoleSerializer


class CreateUser(generics.ListCreateAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_roles = UserRoles.objects.all()
        user_roles_serializer = UserRoleSerializer(user_roles, many=True)
        return Response({'success':True,'designations':user_roles_serializer.data},status=200)

    def post(self, request):
        params = self.extract_values(request)
        print(params)
        try:
            user = Users.objects.create(**params)
            return Response({'success': True}, status=200)
        except Exception as e:
            print(e)
            return Response({'success': False, 'message': 'User Alredy Exists'}, status=200)

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

        data = self.generate_additional_data(params, request.user)

        return data

    def generate_additional_data(self, params, user):
        params['onboarded_by'] = user
        params['username'] = params['email'].split('@')[0]

        return params