

# Register your models here.

from django.contrib import admin
from .models import *
from .tables import *
from .views import*
from .forms import*

@admin.register(Grupo)
class GrupoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre']
    search_fields = ['nombre']
    list_filter = ['nombre']


@admin.register(Alimento)
class AlimentoAdmin(admin.ModelAdmin):
    list_display = ['codigo', 'nombre', 'grupo', 'energia_kcal', 'energia_kj', 'agua_g', 'proteinas_totales_g', 'proteinas_vegetales_g', 
'proteinas_animal', 'grasa_total_g', 'carbohidratos_disponibles_g', 'fibra_dietaria_g', 'cenizas_g', 'calcio_mg', 
'fosforo_mg', 'zinc_mg', 'hierro_mg', 'caroteno_equivalentes_totales_ug', 'vitaminaA_equivalentes_totales_ug', 
'tiamina_mg', 'riboflavina_mg', 'niacina_mg', 'vitaminaC_mg', 'acido_folico_ug', 'sodio_mg', 'potasio_mg']
    search_fields = ['codigo', 'nombre']
    list_filter = ['grupo']
    list_per_page = 20 