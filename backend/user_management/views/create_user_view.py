from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import generics
from rest_framework import views
from rest_framework.parsers import JSONParser, FileUploadParser

from user_management.models import Users

class CreateUser(views.APIView):

    def post(self, request):
        params = self.extract_values(request)
        try:
            user = Users.objects.create(**params)
            return JsonResponse({'success':True,'data':user}, safe=False, status=200)
        except:
            return JsonResponse({'success':False, 'message':'User Alredy Exists'}, safe=False, status=200)
    
    def extract_values(self, request):
        params = {}
        for key, value in  request.data.items():
            if key == 'profile_image':
                params[key] = request.FILES.get('profile_image')
            else:
                params[key] = value

        return params
