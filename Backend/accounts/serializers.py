from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User, WorkerProfile


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


class WorkerProfileSerializer(serializers.ModelSerializer):
    name = serializers.CharField(source="user.full_name")
    image = serializers.SerializerMethodField()
    verified = serializers.BooleanField(source="is_verified")
    verificationBadge = serializers.CharField(source="verification_badge")

    class Meta:
        model = WorkerProfile
        fields = [
            "name",
            "title",
            "location",
            "image",
            "verified",
            "skills",
            "verificationBadge",
            "bio",
            "hourly_rate",
            "availability",
        ]

    def get_image(self, obj):
        request = self.context.get("request")
        if obj.user.profile_picture:
            url = obj.user.profile_picture.url
            return request.build_absolute_uri(url) if request else url
        return None


class WorkerProfileUpdateSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(
        source="user.full_name",
        required=False
    )

    phone = serializers.CharField(
        source="user.phone",
        required=False
    )

    profile_picture = serializers.ImageField(
        source="user.profile_picture",
        required=False
    )

    class Meta:
        model = WorkerProfile

        fields = [
            "full_name",
            "phone",
            "profile_picture",
            "location",
            "bio",
        ]

    def update(self, instance, validated_data):

        user_data = validated_data.pop("user", {})

        # Update User model
        user = instance.user

        if "full_name" in user_data:
            user.full_name = user_data["full_name"]

        if "phone" in user_data:
            user.phone = user_data["phone"]

        if "profile_picture" in user_data:
            user.profile_picture = user_data["profile_picture"]

        user.save()

        # Update WorkerProfile model
        instance.location = validated_data.get(
            "location",
            instance.location
        )

        instance.bio = validated_data.get(
            "bio",
            instance.bio
        )

        instance.save()

        return instance