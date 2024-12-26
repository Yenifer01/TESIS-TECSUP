from django.db import models

# Create your models here.
class Intensidad(models.Model):
    id = models.AutoField(primary_key=True)
    estilo_vida = models.CharField(max_length=100)
    recomendacion = models.CharField(max_length=100)

    def __str__(self):
        return self.estilo_vida

    class Meta:
        verbose_name_plural = "Intensidad"

class Paciente(models.Model):
    # Datos personales
    id = models.AutoField(primary_key=True)
    num_ficha = models.CharField(max_length=30,verbose_name='N° Ficha')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')
    edad = models.IntegerField(verbose_name='Edad')
    genero = models.CharField(
        max_length=10,
        choices=[('M', 'Masculino'), ('F', 'Femenino')],
        default='M',
        verbose_name='Género', 
        null=False,
        blank=False)
    ocupacion = models.CharField(max_length=155)

    # Hábitos

    alcohol = models.CharField(
         max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        default='No(-)',
        verbose_name='Alcohol', 
        null=False,
        blank=False)
    
    tabaco = models.CharField(
        max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        default='No(-)',
        verbose_name='Tabaco', 
        null=False,
        blank=False)
    
    numero_cig_dia = models.IntegerField(verbose_name='N° Cig/Dia')
    def save(self, *args, **kwargs):
        if self.tabaco == 'No(-)':
            self.numero_cig_dia = 0
        super(Paciente, self).save(*args, **kwargs) 
    

    #Funciones Biológicas

    apetito = models.CharField(
        max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        default='Si(+)',
        verbose_name='Apetito', 
        null=False,
        blank=False)
    
    horas_sueño = models.IntegerField(verbose_name='Hrs. Sueño')

    sed = models.CharField(
        max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        default='Si(+)',
        verbose_name='Sed', 
        null=False,
        blank=False)
    
    peso_6_meses = models.IntegerField(verbose_name='Peso/6Meses')


    def __str__(self):
            return self.nombre

    class Meta:
            verbose_name_plural = "Pacientes"