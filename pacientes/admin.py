from django.contrib import admin
from .models import Paciente
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
        js = ('js/pacientes.js',)
        css = {
        'all': ('css/pacientes.css',)
        }

    