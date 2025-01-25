from django.contrib import admin
from .models import Paciente
from django.utils.safestring import mark_safe

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    list_display = ['num_ficha', 'nombre', 'edad', 'genero', 'ocupacion','estado']
    search_fields = ['num_ficha', 'nombre']
    list_filter = ['genero', 'ocupacion']
    exclude = ('num_ficha',)
    fieldsets = [
          (mark_safe("<i class='fas fa-user'></i> Datos Personales"), {
            'fields': ('nombre', 'edad', 'genero', 'ocupacion','paciente_desea'),
            'classes': ('wide', 'extrapadding'),
        }),
         (mark_safe("<i class='fas fa-smoking'></i> Hábitos"), {
            'fields': ('alcohol', 'tabaco', 'numero_cig_dia'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe("<i class='fas fa-heartbeat'></i> Funciones Biológicas"), {
            'fields': ('apetito', 'horas_sueño', 'sed', 'peso_6_meses'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe ("<i class='fas fa-dumbbell'></i> Actividad Física Fuera del Trabajo(OMS)"), {
            'fields': ('tipo', 'intensidad', 'frecuencia', 'duracion', 'recomendacion', 'fc_actividad'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe("<i class='fas fa-history'></i> Antecedentes Familiares y Personales"), {
            'fields': ('diabetes', 'enf_coronarias', 'hipertension', 'obesidad', 'dislipidemia'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe ("<i class='fas fa-ruler'></i> Evaluación Antropométrica I"), {
            'fields': (
                'peso_actual', 'talla', 'p_brazo_contraido', 'd_humero',
                'p_pantorrilla', 'd_femur', 'pliegue_suprespinal',
                'pliegue_pantorilla', 'indice_ponderal', 'peso_ideal',
                'imc', 'tipo_obesidad', 'cir_brazo', 'cintura',
                'p_abdominal', 'cadera'
            ),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe("<i class='fas fa-ruler-horizontal'></i> Evaluación Antropométrica II"), {
            'fields': (
                'recto_leu', 'icc', 'ice',
                'circunferencia_carpo', 'albumina', 'pliegue_triccipital',
                'obesidad_central', 'pliegue_biccipital', 'trigliceridos',
                'pliegue_subescapular', 'c_HDL', 'pliegue_suprailiaco'
            ),
            'classes': ('wide', 'extrapadding'),
        }),
    ]
   
    class Media:
        js = ('js/admin_custom.js',)
        css = {
        'all': ('css/pacientes.css',)
        }