
import django_tables2 as tables
from .models import*

class FaTable(tables.Table):
    class Meta: 
        model = Fa