from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from authentication.views import register_user_view, logout_user_view, change_user_password

urlpatterns = [
    path('user/register/', register_user_view.RegisterUserView.as_view(), name="register_user"),
    path('user/change-password/', change_user_password.ChangePassword.as_view(), name="login_user"),
    path('user/logout/', logout_user_view.logout_user, name="logout_user"),

    path('api/token-auth/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token-refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]