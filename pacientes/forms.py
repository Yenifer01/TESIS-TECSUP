# forms.py

from django import forms
from django.urls import reverse
from django.utils.safestring import mark_safe

from .models import *

class DatosPersonalesForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['num_ficha', 'nombre', 'edad', 'genero', 'ocupacion']

       

class HabitosForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['alcohol', 'tabaco', 'numero_cig_dia']
        

class FuncionesBiologicasForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['apetito', 'horas_sueño', 'sed', 'peso_6_meses']
        


class ActividadFisicaForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['tipo', 'intensidad', 'frecuencia', 'duracion','recomendacion','fc_actividad']
       

class AntecedentesFamiliaresForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['diabetes', 'enf_coronarias', 'hipertension', 'obesidad',' dislipidemia']
       
class EvaluacionAntropometricaIForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['peso_actual', 'talla', 'p_brazo_contraido', 
                  'd_humero','p_pantorrilla','d_femur','pliegue_suprespinal',
                  'pliegue_pantorilla','indice_ponderal',
                  'peso_ideal','imc','tipo_obesidad',
                  'cir_brazo','cintura','p_abdominal','cadera']

class EvaluacionAntropometricaIIForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = ['recto_leu','icc','ice','circunferencia_carpo',
                  'albumina','pliegue_triccipital',
                    'obesidad_central','pliegue_biccipital',
                    'trigliceridos','pliegue_subescapular',
                    'c_HDL','pliegue_suprailiaco']

class ActividadMetabolicaForm(forms.ModelForm):
    class Meta:
        model = ActividadMetabolica
        fields = '__all__'

class ActividadFuncionalForm(forms.ModelForm):
    class Meta:
        model = ActividadFuncional
        fields = '__all__'

class FaActividadMetabolicaForm(forms.ModelForm):
    cantidad_horas = forms.IntegerField(
        label="Cantidad de Horas",
        widget=forms.NumberInput(attrs={'min': 1}),
        min_value=1
    )
    class Meta:
        model = FaActividadMetabolica
        fields = ['actividad', 'cantidad_horas']

    widgets = {
            'actividad': forms.TextInput(attrs={'aria-hidden': 'false'})  # Forzar visibilidad
        }
       
class FaActividadFuncionalForm(forms.ModelForm):
    cantidad_horas = forms.IntegerField(
        label="Cantidad de Horas",
        widget=forms.NumberInput(attrs={'min': 1}),
        min_value=1
    )
    class Meta:
        model = FaActividadFuncional
        fields = ['actividad', 'cantidad_horas']
        widgets = {
            'actividad': forms.Select(attrs={'class': 'form-control actividad-seleccion'}),
            'cantidad_horas': forms.Select(attrs={'class': 'form-control actividad-seleccion'}),
        }
        
class ResumenTmbPesoForm(forms.ModelForm):
    class Meta:
        model = ResumenTmbPeso
        fields = '__all__'     

class FaForm(forms.ModelForm):
    class Meta:
        model = Fa
        fields = '__all__'