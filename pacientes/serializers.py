from rest_framework import serializers
from .models import *


class ActividadMetabolicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadMetabolica
        fields = '__all__'

class ActividadFuncionalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadFuncional
        fields = '__all__'

class FaActividadMetabolicaSerializer(serializers.ModelSerializer):
    actividad_nombre = serializers.CharField(source='actividad.actividades_metabolicas', read_only=True)  
    class Meta:
        model = FaActividadMetabolica
        fields = ['id', 'fa', 'actividad', 'actividad_nombre', 'cantidad_horas']

class FaActividadFuncionalSerializer(serializers.ModelSerializer):
    actividad_nombre = serializers.CharField(source='actividad.actividades_funcionales', read_only=True)  
    class Meta:
        model = FaActividadFuncional
        fields = ['id', 'fa', 'actividad', 'actividad_nombre', 'cantidad_horas']

class ResumenTmbPesoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResumenTmbPeso
        fields = '__all__'

class FaSerializer(serializers.ModelSerializer):
    actividades_metabolicas = FaActividadMetabolicaSerializer(many=True, source="fa_actividades_metabolicas", read_only=True)
    actividades_funcionales = FaActividadFuncionalSerializer(many=True, source="fa_actividades_funcionales", read_only=True)
    resumen_tmb_peso = ResumenTmbPesoSerializer(source="fa_resumen", read_only=True)

    class Meta:
        model = Fa
        fields = ['id', 'paciente', 'formula', 'factor_por', 'actividades_metabolicas', 'actividades_funcionales','resumen_tmb_peso']

    def create(self, validated_data):
        fa_instance = Fa.objects.create(**validated_data)
        return fa_instance

    def update(self, instance, validated_data):
        instance.paciente = validated_data.get('paciente', instance.paciente)
        instance.formula = validated_data.get('formula', instance.formula)
        instance.factor_por = validated_data.get('factor_por', instance.factor_por)
        instance.save()
        return instance
    
class PacienteSerializer(serializers.ModelSerializer):
    fa = FaSerializer(many=True, source="fa_set", read_only=True) 
    class Meta:
        model = Paciente
        fields = '__all__'