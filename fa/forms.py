
from django import forms
from .models import *

class FaForm(forms.ModelForm):
    class Meta:
        model = Fa
        fields = '__all__'


