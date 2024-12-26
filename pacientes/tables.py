
import django_tables2 as tables
from .models import*

class PacienteTable(tables.Table):
    class Meta: 
        model = Paciente

