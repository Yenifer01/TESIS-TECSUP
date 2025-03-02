
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('pacientes/', PacienteListCreateView.as_view(), name='paciente-list-create'), 
    path('pacientes/<int:pk>/', PacienteDetailView.as_view(), name='paciente-detail'),

    path('actividades-metabolicas/', ActividadMetabolicaListCreateView.as_view(), name='actividades-metabolicas-list-create'), 
    path('actividades-metabolicas/<int:pk>/', ActividadMetabolicaDetailView.as_view(), name='actividades-metabolicas-detail'),

    path('actividades-funcionales/', ActividadFuncionalListCreateView.as_view(), name='actividades-funcionales-list-create'), 
    path('actividades-funcionales/<int:pk>/', ActividadFuncionalDetailView.as_view(), name='actividades-funcionales-detail'),

    path('fa/', FaListCreateView.as_view(), name='fa-list-create'), 
    path('fa/<int:pk>/', FaDetailView.as_view(), name='fa-detail'),

    path('resumen/', ResumenTmbPesoListCreateView.as_view(), name='resumen-list-create'), 
    path('resumen/<int:pk>/', ResumenTmbPesoDetailView.as_view(), name='resumen-detail'),

    path('alerta/', views.alerta, name='alerta'),
    
]