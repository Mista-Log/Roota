# wallet/views.py
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import WalletSerializer
from drf_spectacular.utils import (
    extend_schema,
    OpenApiResponse,
    OpenApiExample
)

from .serializers import (
    CreateVirtualAccountSerializer,
    TransactionSerializer
)

from .services.squad import create_virtual_account
from .models import Wallet, VirtualAccount


@extend_schema(
    tags=["Wallet"],
    request=CreateVirtualAccountSerializer,
    responses={
        200: OpenApiResponse(
            description="Virtual account created successfully"
        ),
        400: OpenApiResponse(
            description="Virtual account already exists"
        ),
    },
    examples=[
        OpenApiExample(
            "Create Virtual Account Example",
            value={
                "first_name": "Ibrahim",
                "last_name": "Oloyede",
                "phone_number": "08123456789",
                "email": "ibrahim@gmail.com",
                "bvn": "22343211654",
                "dob": "07/19/1990",
                "address": "Abuja Nigeria",
                "gender": "1",
                "beneficiary_account": "4920299492"
            },
            request_only=True
        )
    ]
)
class CreateVirtualAccountAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CreateVirtualAccountSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        user = request.user

        wallet, _ = Wallet.objects.get_or_create(
            user=user
        )

        # Prevent duplicates
        if hasattr(wallet, "virtual_account"):

            return Response(
                {
                    "message": "Virtual account already exists"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        squad_response = create_virtual_account(
            serializer.validated_data,
            user
        )

        if squad_response.get("success"):

            response_data = squad_response.get("data")

            VirtualAccount.objects.create(
                wallet=wallet,
                customer_identifier=response_data.get(
                    "customer_identifier"
                ),
                account_number=response_data.get(
                    "virtual_account_number"
                ),
                bank_code=response_data.get(
                    "bank_code"
                ),

                first_name=serializer.validated_data["first_name"],
                last_name=serializer.validated_data["last_name"],
                phone_number=serializer.validated_data["phone_number"],
                email=serializer.validated_data["email"],
                bvn=serializer.validated_data["bvn"],
                dob=serializer.validated_data["dob"],
                address=serializer.validated_data["address"],
                gender=serializer.validated_data["gender"],
                beneficiary_account=serializer.validated_data[
                    "beneficiary_account"
                ]
            )

        return Response(squad_response)


@extend_schema(
    tags=["Wallet"],
    responses={
        200: TransactionSerializer(many=True)
    },
    description="Fetch authenticated user's transactions"
)
class TransactionListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        wallet = request.user.wallet

        transactions = wallet.transactions.all().order_by(
            "-created_at"
        )

        serializer = TransactionSerializer(
            transactions,
            many=True
        )

        return Response(serializer.data)


# wallet/views.py

from decimal import Decimal
from django.db import transaction as db_transaction

from drf_spectacular.utils import (
    extend_schema,
    OpenApiExample,
    OpenApiResponse
)

from .serializers import TransferSerializer
from .services.squad import initiate_transfer
from .models import Transaction


@extend_schema(
    tags=["Transactions"],
    request=TransferSerializer,
    responses={
        200: OpenApiResponse(
            description="Transfer successful"
        ),
        400: OpenApiResponse(
            description="Insufficient balance"
        )
    },
    examples=[
        OpenApiExample(
            "Transfer Example",
            value={
                "amount": "5000",
                "account_number": "0123456789",
                "bank_code": "058",
                "account_name": "John Doe",
                "narration": "Payment for service"
            },
            request_only=True
        )
    ]
)
class TransferAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = TransferSerializer(
            data=request.data
        )

        serializer.is_valid(raise_exception=True)

        wallet = request.user.wallet

        amount = serializer.validated_data["amount"]

        # Balance validation
        if wallet.balance < amount:

            return Response(
                {
                    "message": "Insufficient balance"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        # Call Squad API
        squad_response, reference = initiate_transfer(
            serializer.validated_data
        )

        # Transfer success
        if squad_response.get("success"):

            with db_transaction.atomic():

                wallet.balance -= Decimal(amount)
                wallet.save()

                Transaction.objects.create(
                    wallet=wallet,
                    amount=amount,
                    transaction_type="DEBIT",
                    reference=reference,
                    recipient_account=serializer.validated_data[
                        "account_number"
                    ],
                    recipient_bank_code=serializer.validated_data[
                        "bank_code"
                    ],
                    recipient_name=serializer.validated_data[
                        "account_name"
                    ],
                    narration=serializer.validated_data[
                        "narration"
                    ],
                    status="SUCCESS"
                )

        else:

            Transaction.objects.create(
                wallet=wallet,
                amount=amount,
                transaction_type="DEBIT",
                reference=reference,
                recipient_account=serializer.validated_data[
                    "account_number"
                ],
                recipient_bank_code=serializer.validated_data[
                    "bank_code"
                ],
                recipient_name=serializer.validated_data[
                    "account_name"
                ],
                narration=serializer.validated_data[
                    "narration"
                ],
                status="FAILED"
            )

        return Response(squad_response)

@extend_schema(
    tags=["Wallet"],
    responses={
        200: WalletSerializer
    },
    description="Fetch authenticated user's wallet details"
)
class WalletDetailAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        wallet, _ = Wallet.objects.get_or_create(
            user=request.user
        )

        serializer = WalletSerializer(wallet)

        return Response(serializer.data)