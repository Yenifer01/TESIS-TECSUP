from django.db import models

# Create your models here.
class Grupo(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name_plural = "Grupos"


class Alimento(models.Model):
    id= models.AutoField(primary_key=True)
    codigo = models.CharField(max_length=255, blank=True, null=True)
    nombre = models.CharField(max_length=255, blank=True, null=True)
    grupo = models.ForeignKey(Grupo, on_delete=models.CASCADE)
    energia_kcal = models.FloatField(blank=True, null=True)
    energia_kj = models.FloatField(blank=True, null=True)
    agua_g = models.FloatField(blank=True, null=True)
    proteinas_totales_g = models.FloatField(blank=True, null=True)
    proteinas_vegetales_g = models.FloatField(blank=True, null=True)
    proteinas_animal = models.FloatField(blank=True, null=True)
    grasa_total_g = models.FloatField(blank=True, null=True)
    carbohidratos_disponibles_g = models.FloatField(blank=True, null=True)
    fibra_dietaria_g = models.FloatField(blank=True, null=True)
    cenizas_g = models.FloatField(blank=True, null=True)
    calcio_mg = models.FloatField(blank=True, null=True)
    fosforo_mg = models.FloatField(blank=True, null=True)
    zinc_mg = models.FloatField(blank=True, null=True)
    hierro_mg = models.FloatField(blank=True, null=True)
    caroteno_equivalentes_totales_ug = models.FloatField(blank=True, null=True)
    vitaminaA_equivalentes_totales_ug = models.FloatField(blank=True, null=True)
    tiamina_mg = models.FloatField(blank=True, null=True)
    riboflavina_mg = models.FloatField(blank=True, null=True)
    niacina_mg = models.FloatField(blank=True, null=True)
    vitaminaC_mg = models.FloatField(blank=True, null=True)
    acido_folico_ug = models.FloatField(blank=True, null=True)
    sodio_mg = models.FloatField(blank=True, null=True)
    potasio_mg = models.FloatField(blank=True, null=True)

    def __str__(self):
        return self.nombre 

    class Meta:
        verbose_name_plural = "Alimentos"
