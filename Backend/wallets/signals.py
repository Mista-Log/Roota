from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from .models import Wallet, VirtualAccount
from .services.squad import create_virtual_account


@receiver(post_save, sender=User)
def create_user_wallet(sender, instance, created, **kwargs):

    if created:

        wallet = Wallet.objects.create(user=instance)

        squad_response = create_virtual_account(instance)

        data = squad_response.get("data", {})

        VirtualAccount.objects.create(
            wallet=wallet,
            account_name=data.get("account_name"),
            account_number=data.get("account_number"),
            bank_name=data.get("bank_name"),
            squad_virtual_account_id=data.get("virtual_account_id")
        )