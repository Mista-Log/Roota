from django.urls import path

from .views import (
    RegisterView,
    LoginView,
    MeView,
    WorkerDashboardView,
    EmployerDashboardView,
    AdminDashboardView,
)

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),

    # Role Based Routes
    path("worker/dashboard/", WorkerDashboardView.as_view()),
    path("employer/dashboard/", EmployerDashboardView.as_view()),
    path("admin/dashboard/", AdminDashboardView.as_view()),
]