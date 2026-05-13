from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from google.oauth2 import id_token
from google.auth.transport import requests

from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, WorkerProfile, EmployerProfile
from django.contrib.auth import get_user_model

User = get_user_model()



from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
)

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
    UserSerializer
)

from .permissions import (
    IsWorker,
    IsEmployer,
    IsAdmin
)


# =========================
# REGISTER
# =========================
@extend_schema(
    tags=["Authentication"],
    summary="Register User",
    description="Register a new Worker or Employer account.",
    request=RegisterSerializer,
    responses={
        201: OpenApiResponse(
            description="User registered successfully"
        ),
        400: OpenApiResponse(
            description="Validation error"
        )
    }
)
class RegisterView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            user = serializer.save()

            return Response({
                "message": "User created successfully",
                "user": UserSerializer(user).data
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# =========================
# LOGIN
# =========================
@extend_schema(
    tags=["Authentication"],
    summary="Login User",
    description="Authenticate user and return JWT tokens.",
    request=LoginSerializer,
    responses={
        200: OpenApiResponse(
            description="Login successful"
        ),
        400: OpenApiResponse(
            description="Invalid credentials"
        )
    }
)
class LoginView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        serializer = LoginSerializer(data=request.data)

        serializer.is_valid(raise_exception=True)

        return Response(serializer.validated_data)


# =========================
# CURRENT USER
# =========================
@extend_schema(
    tags=["Authentication"],
    summary="Current User",
    description="Get authenticated user's information.",
    responses=UserSerializer
)
class MeView(APIView):

    def get(self, request):

        serializer = UserSerializer(request.user)

        return Response(serializer.data)


# =========================
# WORKER ONLY VIEW
# =========================
@extend_schema(
    tags=["Authentication"],
    summary="Worker Dashboard",
    description="Accessible only by Workers.",
)
class WorkerDashboardView(APIView):

    permission_classes = [IsWorker]

    def get(self, request):

        return Response({
            "message": "Welcome Worker"
        })


# =========================
# EMPLOYER ONLY VIEW
# =========================
@extend_schema(
    tags=["Authentication"],
    summary="Employer Dashboard",
    description="Accessible only by Employers.",
)
class EmployerDashboardView(APIView):

    permission_classes = [IsEmployer]

    def get(self, request):

        return Response({
            "message": "Welcome Employer"
        })


# =========================
# ADMIN ONLY VIEW
# =========================
@extend_schema(
    tags=["Authentication"],
    summary="Admin Dashboard",
    description="Accessible only by Admins.",
)
class AdminDashboardView(APIView):

    permission_classes = [IsAdmin]

    def get(self, request):

        return Response({
            "message": "Welcome Admin"
        })


class GoogleLoginAPIView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        token = request.data.get("token")
        role = request.data.get("role", "WORKER")

        if not token:
            return Response(
                {"detail": "Token missing"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Verify Google token
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
            )

            email = idinfo["email"]
            full_name = idinfo.get("name", "")

            # =========================
            # CREATE OR GET USER
            # =========================
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "full_name": full_name,
                    "role": role,
                }
            )

            # If user already exists, DON'T overwrite role blindly
            if created:
                user.role = role
                user.full_name = full_name
                user.save()

            # =========================
            # CREATE PROFILE HERE (IMPORTANT)
            # =========================
            if user.role == User.Role.WORKER:
                WorkerProfile.objects.get_or_create(user=user)

            elif user.role == User.Role.EMPLOYER:
                EmployerProfile.objects.get_or_create(
                    user=user,
                    defaults={"company_name": ""}
                )

            # =========================
            # AUTHENTICATE USER
            # =========================
            refresh = RefreshToken.for_user(user)

            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),

                "user": {
                    "id": user.id,
                    "email": user.email,
                    "full_name": user.full_name,
                    "role": user.role,
                },

                # 🔥 IMPORTANT FOR FRONTEND FLOW
                "redirect": "/confirm" if created else "/dashboard"
            })

        except ValueError:
            return Response(
                {"detail": "Invalid Google token"},
                status=status.HTTP_400_BAD_REQUEST
            )