from django.contrib import admin
from .models import VirtualAccount, Wallet, Transaction
# Register your models here.
admin.site.register(VirtualAccount)
admin.site.register(Wallet)
admin.site.register(Transaction)
