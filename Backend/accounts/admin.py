from django.contrib import admin
from .models import User, WorkerProfile, EmployerProfile

# Register your models here.
admin.site.register(User)
admin.site.register(WorkerProfile)
admin.site.register(EmployerProfile)
