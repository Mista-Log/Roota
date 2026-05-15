from django.urls import path

from .views import (
    GetEmployerProfileView,
    GoogleLoginAPIView,
    MyWorkerProfileView,
    RegisterView,
    LoginView,
    MeView,
    UpdateEmployerProfileView,
    UpdateWorkerProfileView,
    WorkerListView,
   
)

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    path("workers/me/", MyWorkerProfileView.as_view()),
    path("workers/me/update/", UpdateWorkerProfileView.as_view(), name="update-worker-profile"),
    path("workers/", WorkerListView.as_view(), name="workers-list"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path("employer/profile/", GetEmployerProfileView.as_view(), name="get-employer-profile"),
    path("employer/profile/update/", UpdateEmployerProfileView.as_view(), name="update-employer-profile"),

    path("google/", GoogleLoginAPIView.as_view()),

]