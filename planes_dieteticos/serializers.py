from rest_framework import serializers
from .models import *

class PlanDieteticoSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlanDietetico
        fields = '__all__'
