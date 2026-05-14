# wallet/serializers.py

from rest_framework import serializers
from .models import (
    Wallet,
    VirtualAccount,
    Transaction
)

class CreateVirtualAccountSerializer(serializers.Serializer):

    first_name = serializers.CharField()
    last_name = serializers.CharField()
    phone_number = serializers.CharField()
    email = serializers.EmailField()

    bvn = serializers.CharField()

    dob = serializers.CharField()

    address = serializers.CharField()

    gender = serializers.CharField()

    beneficiary_account = serializers.CharField()


class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields = "__all__"


# wallet/serializers.py

class TransferSerializer(serializers.Serializer):

    amount = serializers.DecimalField(
        max_digits=15,
        decimal_places=2
    )

    account_number = serializers.CharField()

    bank_code = serializers.CharField()

    account_name = serializers.CharField()

    narration = serializers.CharField()

class VirtualAccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = VirtualAccount
        exclude = [
            "bvn"
        ]


class WalletSerializer(serializers.ModelSerializer):

    virtual_account = VirtualAccountSerializer(
        read_only=True
    )

    class Meta:
        model = Wallet
        fields = [
            "id",
            "balance",
            "created_at",
            "virtual_account"
        ]