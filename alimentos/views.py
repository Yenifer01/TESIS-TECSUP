from django.shortcuts import render,redirect
from .forms import *
# Create your views here.
from rest_framework import generics
from .models import *
from .serializers import *
# Vistas para Cliente

class GrupoListCreateView(generics.ListCreateAPIView):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer 

class GrupoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Grupo.objects.all()
    serializer_class = GrupoSerializer


class AlimentoListCreateView(generics.ListCreateAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer 

class AlimentoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Alimento.objects.all()
    serializer_class = AlimentoSerializer

