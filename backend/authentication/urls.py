from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from authentication.views import register_user_view, login_user_view

urlpatterns = [
    path('user/register/', register_user_view.RegisterUserView.as_view(), name="register_user"),
    path('user/login/', login_user_view.LoginUserView.as_view(), name="login_user"),
    path('user/logout/', login_user_view.logout_user, name="logout_user"),

    path('api/token-auth/', TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('api/token-refresh/', TokenRefreshView.as_view(), name="token_refresh"),
]