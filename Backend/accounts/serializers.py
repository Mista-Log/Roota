from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import (
    User,
    WorkerProfile,
    EmployerProfile
)


# =========================
# USER SERIALIZER
# =========================
class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "full_name",
            "role",
            "profile_picture",
            "date_joined",
        ]


# =========================
# REGISTER SERIALIZER
# =========================
class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "email",
            "full_name",
            "password",
            "role",
        ]

    def create(self, validated_data):

        role = validated_data.get("role")

        user = User.objects.create_user(
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            password=validated_data["password"],
            role=role
        )

        # Create profiles automatically
        if role == User.Role.WORKER:
            WorkerProfile.objects.create(user=user)

        elif role == User.Role.EMPLOYER:
            EmployerProfile.objects.create(
                user=user,
                company_name=""
            )

        return user


# =========================
# LOGIN SERIALIZER
# =========================
class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, attrs):

        email = attrs.get("email")
        password = attrs.get("password")

        user = User.objects.filter(email=email).first()

        if user and user.check_password(password):

            refresh = RefreshToken.for_user(user)

            return {
                "user": UserSerializer(user).data,
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }

        raise serializers.ValidationError("Invalid credentials")