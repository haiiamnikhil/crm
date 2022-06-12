from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from user_management.serializer.user_serializer import UserSerializer
from user_management.models import Users


class PresentUser(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            user = request.user
            user_details = UserSerializer(user,many=False)
            return Response({'success':True, 'user':user_details.data}, status=200)
        except:
            return Response({'success':False}, status=200)

class UserDetails(generics.ListAPIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, uid):
        userDetails = self.fetch_details(uid)

        return Response({'success':True, 'user':userDetails})

    def fetch_details(self,uid):
        user = Users.objects.get(username=uid)
        user = UserSerializer(user, many=False)

        return user.data