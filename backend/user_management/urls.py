from django.urls import path
from user_management.views import create_user_view, list_user_view

urlpatterns = [
    path('add-user/', create_user_view.CreateUser.as_view(), name='add-user'),
    path('list-users/', list_user_view.ListUsers.as_view(), name='list-users')
]