# forms.py

from django import forms
from django.urls import reverse
from django.utils.safestring import mark_safe

from .models import Paciente

class DatosPersonalesForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['num_ficha', 'nombre', 'edad', 'genero', 'ocupacion']
        widgets = {
            'num_ficha': forms.TextInput(attrs={'class': 'input-class'}),
            'nombre': forms.TextInput(attrs={'class': 'input-class'}),
            'edad': forms.NumberInput(attrs={'class': 'input-class'}),
            'genero': forms.Select(attrs={'class': 'input-class'}),
            'ocupacion': forms.TextInput(attrs={'class': 'input-class'}),
        }

class HabitosForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['alcohol', 'tabaco', 'numero_cig_dia']
        widgets = {
            'alcohol': forms.Select(attrs={'class': 'input-class'}),
            'tabaco': forms.Select(attrs={'class': 'input-class'}),
            'numero_cig_dia': forms.NumberInput(attrs={'class': 'input-class'}),
        }

class FuncionesBiologicasForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['apetito', 'horas_sueño', 'sed', 'peso_6_meses']
        widgets = {
            'apetito': forms.Textarea(attrs={'class': 'input-class'}),
            'horas_sueño': forms.NumberInput(attrs={'class': 'input-class'}),
            'sed': forms.NumberInput(attrs={'class': 'input-class'}),
            'peso_6_meses': forms.NumberInput(attrs={'class': 'input-class'}),
        }

    def as_p(self):
        form_html = super().as_p()
        cancel_button = f'<a href="{reverse("admin:index")}" class="btn btn-danger">Cancelar</a>'
        return mark_safe(form_html + cancel_button)
