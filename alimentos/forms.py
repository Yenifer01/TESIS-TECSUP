
from django import forms
from .models import *

class GrupoForm(forms.ModelForm):
    class Meta:
        model = Grupo
        fields = '__all__'

class AlimentoForm(forms.ModelForm):
    class Meta:
        model = Alimento
        fields = '__all__'
