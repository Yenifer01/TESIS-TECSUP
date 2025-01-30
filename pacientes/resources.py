from import_export import resources
from .models import Paciente

from import_export.formats.base_formats import XLSX

class PacienteResource(resources.ModelResource):
    class Meta:
        model = Paciente
        export_order = ('num_ficha', 'nombre', 'edad', 'genero', 'ocupacion', 'estado')

    def get_export_formats(self):
        return [XLSX()]

