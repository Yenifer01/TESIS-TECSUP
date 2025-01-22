from django.contrib import admin

from .models import *

@admin.register(PlanDietetico)
class PlanDieteticoAdmin(admin.ModelAdmin):
    list_display = ['fecha_registro', 'nombre_plan', 'objetivo', 'fecha_inicio', 'fecha_fin','estado']
    search_fields = ['nombre_plan', 'fecha_registro']
    list_filter = ['estado']

    fieldsets = [
        ("Configuración del plan", {
            'fields': ('paciente', 'nombre_plan', 'objetivo', 'fecha_inicio','fecha_fin'),
            'classes': ('wide', 'extrapadding'),
        }),
        ("Requerimiento Energético", {
            'fields': ('formula', 'calorias_requeridas', 'calorias_a_planificar'),
            'classes': ('wide', 'extrapadding'),
        }),
    ]
    class Media:
        js = ('js/plan_dietetico.js',)
        css = {
        'all': ('css/plan_dietetico.css',)
        }
        
   