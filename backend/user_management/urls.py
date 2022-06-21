from django.urls import path
from user_management.views import (create_user_view,
                                   list_user_view,
                                   update_user_details,
                                   create_update_user_roles,
                                   delete_user,
                                   deleted_user,
                                   recover_user
                                   )
from user_management.ajax import ajax


urlpatterns = [
    path('add-user/', create_user_view.CreateUser.as_view(), name='add-user'),
    path('list-user/', list_user_view.ListUsers.as_view(), name='list-users'),
    path('update-user/', update_user_details.UpdateUserDetails.as_view(), name='update_user'),
    path('add-user-role/', create_update_user_roles.AddUserRoles.as_view(), name='create_user_role'),
    path('update-user-role/', create_update_user_roles.UpdateUserRoles.as_view(),name='update_user_role'),
    path('delete-user/', delete_user.DeleteUser.as_view(), name='delete_user'),
    path('deleted-user/', deleted_user.GetDeletedUser.as_view(),name='get_deleted_user'),
    path('recover-user/', recover_user.RecoverUser.as_view(), name='recover_deleted_user'),

    # ajax
    path('pu/', ajax.PresentUser.as_view(), name='present_user'),
    path('user-details/<slug:uid>/',ajax.UserDetails.as_view(), name='user_details'),
    path('account/deactivate/', ajax.UpdateUserAccountStatus.as_view(),name='deactivate_user_account'),
    path('get-user-role/', ajax.PresentUserRole.as_view(), name='get_user_roles'),
]
