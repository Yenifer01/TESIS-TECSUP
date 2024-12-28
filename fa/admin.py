from django.contrib import admin
from .models import *
from .tables import *
from .views import*
from .forms import*


# Register your models here.
@admin.register(Fa)
class FaAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre']
    search_fields = ['nombre']
    list_filter = ['nombre']
