from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.contrib.auth.hashers import make_password
from user_management.models import Users


class ChangePassword(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        params = self.extract_values(request.data, request.user)
        user = request.user
        try:
            if user.check_password(params['old_password']) and params['old_password'] != params['new_password']:
                Users.objects.filter(uid=user.uid).update(
                    password=make_password(params['new_password']))
                return Response({'success': True, 'message': 'Password Changed'}, status=200)
            elif user.check_password(params['old_password']) and params['old_password'] == params['new_password']:
                return Response({'success': False, 'message': "Old and New Passwords Shouldnot be same"}, status=200)
            else:
                return Response({'success': False, 'message': "Entered Password is incorrect"}, status=200)
        except:
            pass

    def extract_values(self, data, user):
        params = {}
        user = user
        for key, value in data.items():
            params[key] = value
        return params


class ForgotPassword(generics.CreateAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        params = self.extract_values(request.data)
        try:
            user = Users.objects.get(uid=params['uid'])
            if user:
                user.password(make_password(params['new_password']))
                return Response({'success':True}, status=200)
        except:
            return Response({'success':False}, status=200)


    def extract_values(self, data):
        params = {}
        for key, value in data.items():
            params[key] = value

        return params