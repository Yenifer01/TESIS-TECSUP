from django.contrib import admin
from .models import *
from django.utils.safestring import mark_safe
from import_export.admin import ExportMixin
from .resources import PacienteResource


@admin.register(Paciente)
class PacienteAdmin(ExportMixin, admin.ModelAdmin):
    resource_class = PacienteResource
    list_display = ['num_ficha', 'nombre', 'edad', 'genero', 'ocupacion','estado']
    search_fields = ['num_ficha', 'nombre']
    list_filter = ['genero', 'ocupacion']
    exclude = ('num_ficha',)
   
    
    def formfield_for_dbfield(self, db_field, **kwargs):
        form_field = super().formfield_for_dbfield(db_field, **kwargs)
        if db_field.name in ['indice_ponderal', 'peso_ideal','imc','tipo_obesidad','icc','ice']:
            form_field.widget.attrs.update({
                'readonly': True,
                'style': 'width: 200px;',
            })
            if db_field.name == 'indice_ponderal':
                form_field.help_text = mark_safe(
                    """
                    <a href="#" id="indicePonderalInfo">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                    <div id="modalIndicePonderal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h4 class="title-center">Índice Ponderal</h4>
                            <div id="modalIndiceP" class="modal-body"></div> 
                        </div>
                    </div>
                    """
                )
            elif db_field.name == 'peso_ideal':
                form_field.help_text = mark_safe(
                    """
                    <a href="#" id="pesoIdealInfo">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                    <div id="modalPesoIdeal" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h4 class="title-center">Peso Ideal</h4>
                            <div id="modalPesoI" class="modal-body"></div> 
                        </div>
                    </div>
                    """
                )
            elif db_field.name == 'imc':
                form_field.help_text = mark_safe(
                    """
                    <a href="#" id="imcInfo">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                    <div id="modalImc" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h4 class="title-center">IMC(OMS)</h4>
                            <div id="modalIMC" class="modal-body"></div> 
                        </div>
                    </div>
                    """
                )

            elif db_field.name == 'tipo_obesidad':
                form_field.help_text = mark_safe(
                    """
                    <a href="#" id="TipoObesidadInfo">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                    <div id="modalTipoObesidad" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h4 class="title-center">Tipo de Obesidad</h4>
                            <div id="modalTipo" class="modal-body"></div> 
                        </div>
                    </div>
                    """
                )

            elif db_field.name == 'icc':
                form_field.help_text = mark_safe(
                    """
                    <a href="#" id="iccInfo">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                    <div id="modalIcc" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h4 class="title-center">ICC</h4>
                            <div id="modalicc" class="modal-body"></div> 
                        </div>
                    </div>
                    """
                )

            elif db_field.name == 'ice':
                form_field.help_text = mark_safe(
                    """
                    <a href="#" id="iceInfo">
                        <i class="fas fa-eye"></i> Ver detalle
                    </a>
                    <div id="modalIce" class="modal">
                        <div class="modal-content">
                            <span class="close">&times;</span>
                            <h4 class="title-center">ICE</h4>
                            <div id="modalice" class="modal-body"></div> 
                        </div>
                    </div>
                    """
                ) 

        return form_field
    
    fieldsets = [
          (mark_safe("<i class='fas fa-user'></i> Datos Personales"), {
            'fields': ('nombre', 'edad', 'genero', 'ocupacion'),
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
        js = ('js/pacientes.js',)
        css = {
        'all': ('css/pacientes.css',)
        }

@admin.register(ActividadMetabolica)
class ActividadMetabolicaAdmin(admin.ModelAdmin):
    list_display = ['id', 'actividades_metabolicas', 'coeficiente']
    search_fields = ['actividades_metabolicas']
    list_filter = ['actividades_metabolicas']

@admin.register(ActividadFuncional)
class ActividadFuncionalAdmin(admin.ModelAdmin):
    list_display = ['id', 'actividades_funcionales', 'coeficiente']
    search_fields = ['actividades_funcionales']
    list_filter = ['actividades_funcionales']
    

class FaActividadMetabolicaInline(admin.TabularInline):
    model = FaActividadMetabolica
    extra = 1  
    fields = ['actividad', 'cantidad_horas','horas_totales','total_horas','fraccion_tiempo','coeficiente','subfactor','reb','energia_actividad'] 
    def get_extra(self, request, obj=None, **kwargs):
        self.verbose_name_plural = mark_safe('<i class="fas fa-heart"></i> ' + self.verbose_name_plural)
        return super().get_extra(request, obj, **kwargs)
    

class FaActividadFuncionalInline(admin.TabularInline):
    model = FaActividadFuncional
    extra = 1
    fields = ['actividad', 'cantidad_horas','horas_totales','total_horas','coeficiente','energia_actividad'] 

    def get_extra(self, request, obj=None, **kwargs):
        self.verbose_name_plural = mark_safe('<i class="fas fa-walking"></i> ' + self.verbose_name_plural)
        return super().get_extra(request, obj, **kwargs)
    
class ResumenTmbPesoInline(admin.TabularInline):
    model = ResumenTmbPeso
    fields = ['total_calorias_actividad_tmb', 'coeficiente_actividad_tmb', 'total_calorias_peso_actividad', 'coeficiente_peso_actividad']
    extra = 0 
    max_num=1
    min_num = 1  
    validate_min = True 
    show_change_link = False  
    def has_delete_permission(self, request, obj=None):
        return False 

    def get_extra(self, request, obj=None, **kwargs):
        self.verbose_name_plural = mark_safe('<i class="fas fa-file-alt"></i> ' + self.verbose_name_plural)
        return super().get_extra(request, obj, **kwargs)
    

@admin.register(Fa)
class FaAdmin(admin.ModelAdmin):
    search_fields = ['paciente'] 
    list_display = ['paciente', 'formula','factor_por','mostrar_total_calorias_tmb','mostrar_coeficiente_tmb','mostrar_total_calorias_peso','mostrar_coeficiente_peso']
    list_filter = ['paciente']
    change_form_template="admin/pacientes/fa/change_form.html"
    inlines = [FaActividadMetabolicaInline,FaActividadFuncionalInline,ResumenTmbPesoInline]
    fieldsets = [
        (mark_safe("<i class='fas fa-flask'></i> Tasa Metabólica Basal a Usar"), {
            'fields': ('paciente', 'formula', 'factor_por'),
            'classes': ('wide', 'extrapadding'),
        }),
    ]

    def mostrar_total_calorias_tmb(self, obj):
        """Muestra el total de calorías de ResumenTmbPeso"""
        if hasattr(obj, 'fa_resumen'):
            return obj.fa_resumen.total_calorias_actividad_tmb
        return "Sin datos"
    
    def mostrar_coeficiente_tmb(self, obj):
        """Muestra el gasto total de ResumenTmbPeso"""
        if hasattr(obj, 'fa_resumen'):
            return obj.fa_resumen.coeficiente_actividad_tmb
        return "Sin datos"
    
    def mostrar_total_calorias_peso(self, obj):
        """Muestra el total de calorías de ResumenTmbPeso"""
        if hasattr(obj, 'fa_resumen'):
            return obj.fa_resumen.total_calorias_peso_actividad
        return "Sin datos"
    
    def mostrar_coeficiente_peso(self, obj):
        """Muestra el gasto total de ResumenTmbPeso"""
        if hasattr(obj, 'fa_resumen'):
            return obj.fa_resumen.coeficiente_peso_actividad
        return "Sin datos"

    mostrar_total_calorias_tmb.short_description = "Total Kcal(Actividad vs TMB)"
    mostrar_coeficiente_tmb.short_description = "CAF(Actividad vs TMB)"
    mostrar_total_calorias_peso.short_description = "Total Kcal(Peso vs Actividad)"
    mostrar_coeficiente_peso.short_description = "CAF(Peso vs Actividad)"


    def get_search_results(self, request, queryset, search_term):
        return super().get_search_results(request, queryset, search_term)
    
    class Media:
        js = ('js/actividad_tmb.js',)
