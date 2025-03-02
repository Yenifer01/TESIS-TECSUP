from django.db import models
from pacientes.models import *
# Create your models here.
class PlanDietetico(models.Model):
    id = models.AutoField(primary_key=True)
    fecha_registro = models.DateTimeField(auto_now_add=True,verbose_name='Fecha de Creación')
    paciente = models.ForeignKey(Paciente, on_delete=models.CASCADE)
    nombre_plan = models.CharField(max_length=60, blank=True, null=True, verbose_name='Nombre del Plan')
    formula = models.CharField(
        choices=[('OMS','OMS'),('Harris Benedict','Harris Benedict'),('Schofield','Schofield')],
        max_length=30,
        verbose_name='Fórmula a Utilizar', 
        null=False,
        blank=False)
    calorias_requeridas = models.IntegerField(verbose_name='Calorías Requeridas')
    calorias_a_planificar = models.IntegerField(verbose_name='Calorías a Planificar')
    fecha_inicio = models.DateField(verbose_name='Fecha de Inicio')
    fecha_fin = models.DateField(verbose_name='Fecha de Término')
    estado = models.BooleanField(default=True,verbose_name="Estado")

    porcentaje_proteina = models.FloatField(verbose_name='Proteína (%)')
    porcentaje_carbohidrato = models.FloatField(verbose_name='Carbohidratos (%)')
    porcentaje_grasa = models.FloatField(verbose_name='Grasa (%)')

    def __str__(self):
            return self.nombre_plan

    class Meta:
            verbose_name_plural = "Planes Dietéticos"
    
    

