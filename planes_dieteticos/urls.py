
from django.urls import path
from .views import *
from . import views

urlpatterns = [
    path('datos-paciente/<int:paciente_id>/', views.obtener_datos_paciente, name='obtener_datos_paciente'),
    path('plandietetico/', PlanDieteticoListCreateView.as_view(), name='plandietetico-list-create'),  
    path('plandietetico/<int:pk>/', PlanDieteticoDetailView.as_view(), name='plandietetico-detail')
]
