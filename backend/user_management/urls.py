from django.urls import path
from user_management.views import create_user_view, list_user_view, update_user_details
from user_management.ajax import ajax


urlpatterns = [
    path('add-user/', create_user_view.CreateUser.as_view(), name='add-user'),
    path('list-user/', list_user_view.ListUsers.as_view(), name='list-users'),
    path('update-user/', update_user_details.UpdateUserDetails.as_view(), name='update_user'),

    #ajax
    path('pu/', ajax.PresentUser.as_view(), name='present_user'),
    path('user-details/<slug:uid>/', ajax.UserDetails.as_view(), name='user_details')
]