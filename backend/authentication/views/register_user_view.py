from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from django.http import JsonResponse
from django.contrib.auth.hashers import make_password
from django.shortcuts import render

from user_management.models import Users


class RegisterUserView(APIView):
    renderer_classes = [TemplateHTMLRenderer,]
    
    template_name="auth/user/auth_user.html"

    def get(self, request):
        print(request.user)
        return Response(template_name=self.template_name)

    def post(self, request):
        params = self.extract_values(request)
        try:
            user = Users.objects.get(email=params['email'])
            if not user.password:
                user.password = params['password']
                user.save()
                return Response({'status':True}, status=200)

            return Response({'status':True,'message':'Password alredy created'}, status=200)

        except Exception as e:
            print(e)
            return Response({'status':False,'message':'Something went wrong'},safe=False, status=200)

    def extract_values(self,request):
        params = {}
        params['email'] = request.data['email']
        params['password'] = make_password(request.data['password'])
        
        return params
            