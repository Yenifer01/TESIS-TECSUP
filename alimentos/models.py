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
    codigo = models.CharField(max_length=20, blank=True, null=True, verbose_name='Código')
    nombre = models.CharField(max_length=50, blank=True, null=True,verbose_name='Nombre')
    grupo = models.ForeignKey(Grupo, on_delete=models.CASCADE)
    energia_kcal = models.FloatField(blank=True, null=True,verbose_name='Energía(kcal)')
    energia_kj = models.FloatField(blank=True, null=True, verbose_name='Energía(kj)')
    agua_g = models.FloatField(blank=True, null=True, verbose_name='Agua(g)')
    proteinas_totales_g = models.FloatField(blank=True, null=True,verbose_name='Proteínas totales(g)')
    proteinas_vegetales_g = models.FloatField(blank=True, null=True,verbose_name='Proteínas vegetales(g)')
    proteinas_animal = models.FloatField(blank=True, null=True, verbose_name='Proteínas animal')
    grasa_total_g = models.FloatField(blank=True, null=True,verbose_name='Grasa total(g)')
    carbohidratos_disponibles_g = models.FloatField(blank=True, null=True,verbose_name='Carbohidratos disponibles(g)')
    fibra_dietaria_g = models.FloatField(blank=True, null=True,verbose_name='Fibra dietaria(g)')
    cenizas_g = models.FloatField(blank=True, null=True,verbose_name='Cenizas(g)')
    calcio_mg = models.FloatField(blank=True, null=True,verbose_name='Calcio(mg)')
    fosforo_mg = models.FloatField(blank=True, null=True,verbose_name='Fósforo(mg)')
    zinc_mg = models.FloatField(blank=True, null=True,verbose_name='Zinc(mg)')
    hierro_mg = models.FloatField(blank=True, null=True,verbose_name='Hierro(mg)')
    caroteno_equivalentes_totales_ug = models.FloatField(blank=True, null=True,verbose_name='Caroteno equivalentes totales(ug)')
    vitaminaA_equivalentes_totales_ug = models.FloatField(blank=True, null=True,verbose_name='Vitamina A equivalentes totales(ug)')
    tiamina_mg = models.FloatField(blank=True, null=True,verbose_name='Tiamina(mg)')
    riboflavina_mg = models.FloatField(blank=True, null=True,verbose_name='Riboflavina(mg)')
    niacina_mg = models.FloatField(blank=True, null=True,verbose_name='Niacina(mg)')
    vitaminaC_mg = models.FloatField(blank=True, null=True,verbose_name='Vitamina C(mg)')
    acido_folico_ug = models.FloatField(blank=True, null=True,verbose_name='Ácido fólico(ug)')
    sodio_mg = models.FloatField(blank=True, null=True,verbose_name='Sodio(mg)')
    potasio_mg = models.FloatField(blank=True, null=True,verbose_name='Potasio(mg)')

    def __str__(self):
        return self.nombre 

    class Meta:
        verbose_name_plural = "Alimentos"
