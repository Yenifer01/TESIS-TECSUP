
from django.urls import path
from .views import *

urlpatterns = [
    path('paciente/', PacienteListCreateView.as_view(), name='paciente-list-create'),  
    
]