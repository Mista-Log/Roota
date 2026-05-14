import uuid
import requests
from django.conf import settings


BASE_URL = settings.SQUAD_BASE_URL

headers = {
    "Authorization": f"Bearer {settings.SQUAD_SECRET_KEY}",
    "Content-Type": "application/json"
}


def create_virtual_account(data, user):

    payload = {
        "customer_identifier": f"SQUAD_{user.id}",
        "first_name": data["first_name"],
        "last_name": data["last_name"],
        "mobile_num": data["phone_number"],
        "email": data["email"],
        "bvn": data["bvn"],
        "dob": data["dob"],
        "address": data["address"],
        "gender": data["gender"],
        "beneficiary_account": data["beneficiary_account"]
    }

    response = requests.post(
        f"{BASE_URL}/virtual-account",
        json=payload,
        headers=headers
    )

    return response.json()





def initiate_transfer(data):

    reference = str(uuid.uuid4())

    payload = {
        "amount": float(data["amount"]),
        "bank_code": data["bank_code"],
        "account_number": data["account_number"],
        "account_name": data["account_name"],
        "transaction_reference": reference,
        "narration": data["narration"],
        "currency": "NGN"
    }

    response = requests.post(
        f"{BASE_URL}/transfer",
        json=payload,
        headers=headers
    )

    return response.json(), reference