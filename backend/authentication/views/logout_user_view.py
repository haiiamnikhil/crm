from django.http import JsonResponse
from django.contrib.auth import logout

from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def logout_user(request):
    logout(request)
    return JsonResponse({'success':True},safe=False,status=200)