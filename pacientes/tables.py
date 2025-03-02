
import django_tables2 as tables
from .models import*

class PacienteTable(tables.Table):
    class Meta: 
        model = Paciente


class ActividadMetabolicaTable(tables.Table):
    class Meta: 
        model = ActividadMetabolica

class ActividadFuncionalTable(tables.Table):
    class Meta: 
        model = ActividadFuncional

class FaTable(tables.Table):
    class Meta:
        model = Fa

class FaActividadMetabolicaTable(tables.Table):
    class Meta:
        model = FaActividadMetabolica
       
class FaActividadFuncionalTable(tables.Table):
    class Meta:
        model = FaActividadFuncional

class ResumenTmbPesoTable(tables.Table):
    class Meta:
        model = ResumenTmbPeso