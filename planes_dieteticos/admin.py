from django.contrib import admin
from .models import *
import plotly.graph_objects as go
from django.utils.safestring import mark_safe
import plotly.offline as opy

@admin.register(PlanDietetico)
class PlanDieteticoAdmin(admin.ModelAdmin):
    list_display = ['fecha_registro', 'nombre_plan','fecha_inicio', 'fecha_fin','estado']
    search_fields = ['nombre_plan', 'fecha_registro']
    list_filter = ['estado']

    fieldsets = [
        (mark_safe("<i class='fas fa-cogs'></i> Configuración del plan"), {
            'fields': ('paciente', 'nombre_plan', 'fecha_inicio','fecha_fin','estado'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe("<i class='fas fa-bolt'></i> Requerimiento Energético"), {
            'fields': ('formula', 'calorias_requeridas', 'calorias_a_planificar'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe("<i class='fas fa-drumstick-bite'></i> Distribución de Macronutrientes"), {
            'fields': ('porcentaje_proteina', 'porcentaje_carbohidrato', 'porcentaje_grasa','macronutrientes_preview','switch','macronutrientes_por_tiempo_comida'),
            'classes': ('wide', 'extrapadding'),
        }),
        (mark_safe("<i class='fas fa-drumstick-bite'></i>Plan Dietético"), {
            'fields': ('tabla_preparaciones',),
            'classes': ('wide', 'extrapadding'),
        }),
    ]

    def macronutrientes_preview(self, obj=None):
        return mark_safe('<div id="tabla-macronutrientes">Cargando...</div>')
    
    def switch(self, obj=None):
        return mark_safe('<div id="switch-macronutrientes">Cargando...</div>')
    
    def macronutrientes_por_tiempo_comida(self, obj=None):
        return mark_safe('<div id="tabla-macronutrientes_por_comida">¡Se mostrará una vez asignado un porcentaje a cada tiempo de comida!.</div>')
    

    def tabla_preparaciones(self, obj=None):
        return mark_safe('<div id="tabla_preparaciones"></div>')
    

    macronutrientes_preview.short_description = "Tabla de distribución de Macronutrientes"
    switch.short_description = "Distribuir por tiempo de Comida"
    macronutrientes_por_tiempo_comida.short_description = "Tabla de Distribución por Tiempo de Comida"
    tabla_preparaciones.short_description = "Plan de Preparaciones"
    readonly_fields = ['macronutrientes_preview','switch','macronutrientes_por_tiempo_comida','tabla_preparaciones']

   
    class Media:
        js = (
            'js/plan_dietetico.js',
        )
        css = {
            'all': (
                'css/plan_dietetico.css',
            )
    }

        
   
    