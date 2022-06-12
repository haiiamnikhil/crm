from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.models import Users


class CreateUser(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        params = self.extract_values(request)
        try:
            user = Users.objects.create(**params)
            return Response({'success': True}, status=200)
        except:
            return Response({'success': False, 'message': 'User Alredy Exists'}, status=200)

    def extract_values(self, request):
        params = {}
        for key, value in request.data.items():
            if key == 'profile_image':
                params[key] = request.FILES.get('profile_image')
            else:
                params[key] = value

        data = self.generate_additional_data(params, request.user)

        return data

    def generate_additional_data(self, params, user):
        params['onboarded_by'] = user
        params['username'] = params['email'].split('@')[0]

        return params