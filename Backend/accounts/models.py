from django.utils import timezone
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
import uuid
from cloudinary.models import CloudinaryField


# =========================
# USER MANAGER
# =========================
class CustomUserManager(BaseUserManager):
    def create_user(self, email, full_name, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            full_name=full_name,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, full_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", User.Role.ADMIN)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, full_name, password, **extra_fields)


# =========================
# USER MODEL
# =========================
# models.py

class User(AbstractBaseUser, PermissionsMixin):

    class Role(models.TextChoices):
        WORKER = "WORKER", "Worker"
        EMPLOYER = "EMPLOYER", "Employer"
        ADMIN = "ADMIN", "Admin"

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    email = models.EmailField(unique=True)

    full_name = models.CharField(max_length=255, blank=True, null=True)

    phone = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.WORKER
    )

    profile_picture = CloudinaryField(
        "profile_picture",
        blank=True,
        null=True
    )

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["full_name"]

    objects = CustomUserManager()


class WorkerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    # Core profile info (for UI hero)
    title = models.CharField(max_length=255, blank=True)  # "Senior AI Data Strategist"
    location = models.CharField(max_length=255, blank=True)  # "Lagos, Nigeria"

    bio = models.TextField(blank=True)

    skills = models.JSONField(default=list)

    hourly_rate = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )

    availability = models.CharField(max_length=100, blank=True)

    # Verification system (important for your badge UI)
    is_verified = models.BooleanField(default=False)

    verification_badge = models.CharField(
        max_length=255,
        blank=True,
        default="Verified Economic Identity"
    )

    def __str__(self):
        return f"Worker: {self.user.full_name}"

class EmployerProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    company_name = models.CharField(max_length=255)
    industry = models.CharField(max_length=150, blank=True)
    website = models.URLField(blank=True)

    location = models.CharField(max_length=255, blank=True)

    bio = models.TextField(blank=True)

    def __str__(self):
        return f"Employer: {self.company_name}"