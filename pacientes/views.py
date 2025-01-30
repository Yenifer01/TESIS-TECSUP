
from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from .models import *
from .serializers import *
import openpyxl
from django.http import HttpResponse
# Vistas para Cliente

class PacienteListCreateView(generics.ListCreateAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer 

class PacienteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer 

