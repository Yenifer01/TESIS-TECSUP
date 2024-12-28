from django.shortcuts import render
# Create your views here.
from rest_framework import generics
from .models import *
from .serializers import *
# Vistas para Cliente

class FaListCreateView(generics.ListCreateAPIView):
    queryset = Fa.objects.all()
    serializer_class = FaSerializer 

class FaDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Fa.objects.all()
    serializer_class = FaSerializer