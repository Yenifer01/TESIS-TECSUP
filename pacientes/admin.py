# admin.py

from django.contrib import admin
from .models import Paciente

@admin.register(Paciente)
class PacienteAdmin(admin.ModelAdmin):
    # Listado en el panel administrativo
    list_display = ['id', 'num_ficha', 'nombre', 'edad', 'genero', 'ocupacion']
    search_fields = ['num_ficha', 'nombre']
    list_filter = ['genero', 'ocupacion']

    # Dividir en secciones en el formulario
    fieldsets = (
        ("Datos Personales", {
            'fields': ['num_ficha', 'nombre', 'edad', 'genero', 'ocupacion'],
            'classes': ('wide', 'extrapadding'),  # Puedes crear clases personalizadas
        }),
        ("Hábitos", {
            'fields': ['alcohol', 'tabaco', 'numero_cig_dia'],
            'classes': ('wide', 'extrapadding'),
        }),
        ("Funciones Biológicas", {
            'fields': ['apetito', 'horas_sueño', 'sed', 'peso_6_meses'],
            'classes': ('wide', 'extrapadding'),
        }),
    )

    # Personalización de formulario
    class Media:
        css = {
            'all': ('css/admin_custom.css',),  # Archivo de CSS para personalización
        }
