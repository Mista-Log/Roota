from django.db import models
from django.conf import settings
import uuid


class Wallet(models.Model):

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="wallet"
    )

    balance = models.DecimalField(
        max_digits=15,
        decimal_places=2,
        default=0.00
    )

    created_at = models.DateTimeField(auto_now_add=True)


class VirtualAccount(models.Model):

    wallet = models.OneToOneField(
        Wallet,
        on_delete=models.CASCADE,
        related_name="virtual_account"
    )

    customer_identifier = models.CharField(
        max_length=255,
        unique=True,
        blank=True
    )

    account_number = models.CharField(
        max_length=20,
        unique=True,
        blank=True
    )

    bank_code = models.CharField(max_length=255, blank=True)

    first_name = models.CharField(max_length=255, blank=True)

    last_name = models.CharField(max_length=255, blank=True)

    phone_number = models.CharField(max_length=255, blank=True)

    email = models.EmailField(max_length=255, blank=True)

    bvn = models.CharField(max_length=255, blank=True)

    dob = models.CharField(max_length=255, blank=True)

    address = models.TextField(max_length=255, blank=True)

    gender = models.CharField(max_length=255, blank=True)

    beneficiary_account = models.CharField(
        max_length=255, blank=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

# wallet/models.py

# wallet/models.py

class Transaction(models.Model):

    class TransactionType(models.TextChoices):
        CREDIT = "CREDIT", "Credit"
        DEBIT = "DEBIT", "Debit"

    class Status(models.TextChoices):
        SUCCESS = "SUCCESS", "Success"
        PENDING = "PENDING", "Pending"
        FAILED = "FAILED", "Failed"

    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )

    wallet = models.ForeignKey(
        Wallet,
        on_delete=models.CASCADE,
        related_name="transactions"
    )

    amount = models.DecimalField(
        max_digits=15,
        decimal_places=2
    )

    transaction_type = models.CharField(
        max_length=20,
        choices=TransactionType.choices
    )

    reference = models.CharField(
        max_length=255,
        unique=True
    )

    recipient_account = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    recipient_bank_code = models.CharField(
        max_length=20,
        blank=True,
        null=True
    )

    recipient_name = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    narration = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )

    created_at = models.DateTimeField(auto_now_add=True)