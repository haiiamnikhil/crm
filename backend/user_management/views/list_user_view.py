from rest_framework.generics import ListAPIView

from django.http import JsonResponse

from user_management.models import Users
from user_management.serializer.user_serializer import ListUserSerializer


class ListUsers(ListAPIView):
    
    def get(self, request):
        users = self.get_userlist(request)
        return JsonResponse({'data':users,'success':True}, safe=False, status=200)

    def get_userlist(self, request):
        users = Users.objects.all()
        userserialized = ListUserSerializer(users, many=True)
        return userserialized.data