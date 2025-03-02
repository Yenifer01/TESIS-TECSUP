
from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from .models import *
from .serializers import *

from django.contrib import messages
from django.http import JsonResponse
from django.views import View
from pacientes.models import Paciente
import plotly.graph_objects as go
import numpy as np
from decimal import Decimal
# Vistas para Cliente

class PacienteListCreateView(generics.ListCreateAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer 

class PacienteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer 

class ActividadMetabolicaListCreateView(generics.ListCreateAPIView):
    queryset = ActividadMetabolica.objects.all()
    serializer_class = ActividadMetabolicaSerializer 

class ActividadMetabolicaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActividadMetabolica.objects.all()
    serializer_class = ActividadMetabolicaSerializer 

class ActividadFuncionalListCreateView(generics.ListCreateAPIView):
    queryset = ActividadFuncional.objects.all()
    serializer_class = ActividadFuncionalSerializer 

class ActividadFuncionalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActividadFuncional.objects.all()
    serializer_class = ActividadFuncionalSerializer 

class FaActividadMetabolicaListCreateView(generics.ListCreateAPIView):
    queryset = FaActividadMetabolica.objects.all()
    serializer_class = FaActividadMetabolicaSerializer 

class FaActividadMetabolicaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FaActividadMetabolica.objects.all()
    serializer_class = FaActividadMetabolicaSerializer 

class FaActividadFuncionalListCreateView(generics.ListCreateAPIView):
    queryset = FaActividadFuncional.objects.all()
    serializer_class = FaActividadFuncionalSerializer 

class FaActividadFuncionalDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FaActividadFuncional.objects.all()
    serializer_class = FaActividadFuncionalSerializer 

class FaListCreateView(generics.ListCreateAPIView):
    queryset = Fa.objects.all()
    serializer_class = FaSerializer 

class FaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fa.objects.all()
    serializer_class = FaSerializer 

class ResumenTmbPesoListCreateView(generics.ListCreateAPIView):
    queryset = ResumenTmbPeso.objects.all()
    serializer_class = ResumenTmbPesoSerializer 

class ResumenTmbPesoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = ResumenTmbPeso.objects.all()
    serializer_class = ResumenTmbPesoSerializer 


def alerta(request):
    total_horas = float(request.POST.get('total_horas', 0))
    max_horas = float(request.POST.get('max_horas', 0))

    if total_horas >= max_horas:
        messages.error(request, "⚠️ Las horas ya están completas, no puedes agregar más actividades.")
        return JsonResponse({"status": "error", "message": "Las horas ya están completas"}, status=400)

    return JsonResponse({"status": "ok"})

