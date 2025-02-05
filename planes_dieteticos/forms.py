from django import forms
from django.contrib import admin
from .models import PlanDietetico

# Formulario personalizado para PlanDietetico
class PlanDieteticoForm(forms.ModelForm):
    class Meta:
        model = PlanDietetico
        fields = '__all__'

  