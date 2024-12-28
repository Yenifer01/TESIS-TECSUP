
from django.urls import path
from .views import *

urlpatterns = [
    path('fa/', FaListCreateView.as_view(), name='fa-list-create'), 
    path('fa/<int:pk>/', FaDetailView.as_view(), name='fa-detail'),  
  
]
