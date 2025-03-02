
from django.urls import path
from .views import *
from .dashboard import*

urlpatterns = [
    path('reportes/', MyCustomDashboard.as_view(), name='reportes'),
    
]
