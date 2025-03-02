from django.shortcuts import render
from rest_framework import generics
from .models import *
from .serializers import *
from django.http import JsonResponse
from django.shortcuts import get_object_or_404


class  PlanDieteticoListCreateView(generics.ListCreateAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PlanDieteticoSerializer

class  PlanDieteticoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Paciente.objects.all()
    serializer_class = PlanDieteticoSerializer

def obtener_datos_paciente(request, paciente_id):
    paciente = get_object_or_404(Paciente, id=paciente_id)
    edad = paciente.edad
    genero = paciente.genero
    fc_actividad = paciente.fc_actividad
    peso = paciente.peso_actual
    talla = paciente.talla
    peso_6_meses = paciente.peso_6_meses
    return JsonResponse({
        'edad': edad,
        'genero': genero,
        'fc_actividad': fc_actividad,
        'peso': peso,
        'talla': talla,
        'peso_6_meses':peso_6_meses
    })
