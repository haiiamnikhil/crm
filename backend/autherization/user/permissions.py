from rest_framework import permissions


class AllowUser(permissions.BasePermission):

    SAFE_USER_METHODS = ('POST','GET','PUT')

    def has_permission(self, request, view):
        if request.user.is_authenticated:

            if request.user.designation == None:
                return False
    