from rest_framework.permissions import BasePermission

from .models import User


class IsWorker(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == User.Role.WORKER


class IsEmployer(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == User.Role.EMPLOYER


class IsAdmin(BasePermission):

    def has_permission(self, request, view):
        return request.user.role == User.Role.ADMIN