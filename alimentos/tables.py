

import django_tables2 as tables
from .models import*


class GrupoTable(tables.Table):
    class Meta: 
        model = Grupo

class AlimentoTable(tables.Table):
    class Meta: 
        model = Alimento

