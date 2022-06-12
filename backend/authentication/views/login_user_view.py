from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer, JSONRenderer
from rest_framework.response import Response
from rest_framework import generics

from django.shortcuts import redirect, render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views import View
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

import jwt, datetime


@method_decorator(csrf_exempt, name="dispatch")
class LoginUserView(generics.ListCreateAPIView):

    renderer_classes = [TemplateHTMLRenderer, JSONRenderer]
    template_name = "auth/user/auth_user.html"

    def get(self, request):
        return Response(template_name=self.template_name)

    def post(self, request):
        params = self.extract_values(request.data)
        user = authenticate(request, username= params['username'], password=params['password'])

        # print(user)
        payload = {
            'id' : user.id,
            'exp' : datetime.datetime.utcnow() + datetime.timedelta(milliseconds=60),
            'iat' : datetime.datetime.utcnow()
        }

        token = jwt.encode(payload,'secret').decode('utf-8')
        print(token)

        if user is not None:
            login(request, user)
            print(user)
            return Response({'success': True,'token':token}, status=200)
        else:
            return JsonResponse({'success': False}, status=200, safe=False)

    def extract_values(self, data):
        params = {}
        params['username'] = data['email']
        params['password'] = data['password']

        return params

@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({'success':True},safe=False,status=200)