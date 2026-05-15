from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os


class Command(BaseCommand):
    help = "Create superuser if it does not exist"

    def handle(self, *args, **kwargs):
        User = get_user_model()

        email = os.getenv("DJANGO_SUPERUSER_EMAIL")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD")

        username = os.getenv(
            "DJANGO_SUPERUSER_USERNAME",
            "admin"
        )

        login_field = User.USERNAME_FIELD

        lookup_value = (
            email
            if login_field == "email"
            else username
        )

        if User.objects.filter(
            **{login_field: lookup_value}
        ).exists():

            self.stdout.write(
                self.style.SUCCESS(
                    "Superuser already exists"
                )
            )
            return

        create_kwargs = {
            login_field: lookup_value,
            "password": password,
        }

        # Add username only if model has it
        model_fields = [
            field.name
            for field in User._meta.fields
        ]

        if "username" in model_fields:
            create_kwargs["username"] = username

        if "email" in model_fields:
            create_kwargs["email"] = email

        User.objects.create_superuser(
            **create_kwargs
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Superuser created successfully"
            )
        )