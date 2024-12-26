from rest_framework import serializers
from .models import *

class IntensidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Intensidad
        fields = '__all__'

class PacienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paciente
        fields = '__all__'

