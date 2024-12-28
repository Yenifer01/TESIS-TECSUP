from rest_framework import serializers
from .models import *

class FaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Fa
        fields = '__all__'


