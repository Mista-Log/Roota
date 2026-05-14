# wallet/urls.py

from django.urls import path

from .views import (
    CreateVirtualAccountAPIView,
    TransactionListAPIView,
    TransferAPIView,
    WalletDetailAPIView
)

urlpatterns = [

    path(
        "create-virtual-account/",
        CreateVirtualAccountAPIView.as_view()
    ),

    path(
        "transactions/",
        TransactionListAPIView.as_view()
    ),
    path(
        "transfer/",
        TransferAPIView.as_view()
    ),

    path(
    "me/",
    WalletDetailAPIView.as_view()
),
]