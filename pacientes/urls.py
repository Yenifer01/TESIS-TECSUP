
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('pacientes/', PacienteListCreateView.as_view(), name='paciente-list-create'), 
    path('pacientes/<int:pk>/', PacienteDetailView.as_view(), name='paciente-detail'),
    
]