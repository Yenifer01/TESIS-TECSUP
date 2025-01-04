
from django import views
from django.urls import path
from .views import *

urlpatterns = [
    path('grupos/', GrupoListCreateView.as_view(), name='grupo-list-create'),  
    path('grupos/<int:pk>/', GrupoDetailView.as_view(), name='grupo-detail'), 
    path('alimentos/', AlimentoListCreateView.as_view(), name='alimento-list-create'),  
    path('alimentos/<int:pk>/', AlimentoDetailView.as_view(), name='alimento-detail'), 
]
