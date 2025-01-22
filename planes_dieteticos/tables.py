
import django_tables2 as tables
from .models import*

class PlanDieteticoTable(tables.Table):
    class Meta: 
        model = PlanDietetico

