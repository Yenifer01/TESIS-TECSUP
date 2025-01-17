from django.db import models

# Create your models here.

class Paciente(models.Model):
    # Datos personales
    id = models.AutoField(primary_key=True)
    num_ficha = models.CharField(max_length=100,editable=False,verbose_name='N° Ficha')
    nombre = models.CharField(max_length=100, verbose_name='Nombre')
    edad = models.IntegerField(verbose_name='Edad')
    genero = models.CharField(
        max_length=10,
        choices=[('M', 'Masculino'), ('F', 'Femenino')],
        verbose_name='Género', 
        null=False,
        blank=False)
    ocupacion = models.CharField(max_length=155,verbose_name='Ocupación')
    def save(self, *args, **kwargs):
    
        if not self.pk:  
            super().save(*args, **kwargs)  
            prefijo = "EAMA"
            self.num_ficha = f"{prefijo}{self.id}"  
        super(Paciente, self).save(*args, **kwargs) 

    # Hábitos
    alcohol = models.CharField(
         max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        verbose_name='Alcohol', 
        null=False,
        blank=False)
    
    tabaco = models.CharField(
        max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        verbose_name='Tabaco', 
        null=False,
        blank=False)
    
    numero_cig_dia = models.IntegerField(verbose_name='N° Cig/Dia')
   

    #Funciones Biológicas
    apetito = models.CharField(
        max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        verbose_name='Apetito', 
        null=False,
        blank=False)
    
    horas_sueño = models.IntegerField(verbose_name='Hrs. Sueño')

    sed = models.CharField(
        max_length=10,
        choices=[('No(-)','No(-)'),('Si(+)','Si(+)'),('Si(++)','Si(++)'),('Si(+++)','Si(+++)')],
        verbose_name='Sed', 
        null=False,
        blank=False)
    
    peso_6_meses = models.IntegerField(verbose_name='Peso/6Meses')

   # Actividad Física Fuera del Trabajo(OMS)
    tipo = models.CharField(
        choices=[('Caminar lento','Caminar lento'),('Caminar rápido','Caminar rápido'),('Caminar de subida','Caminar de subida'),
                 ('Caminar de bajada','Caminar de bajada'),('Subir escaleras','Subir escaleras'),
                 ('Ejercicios aeróbicos-Baja intensidad','Ejercicios aeróbicos-Baja intensidad'),
                 ('Ejercicios aeróbicos-Alta intensidad','Ejercicios aeróbicos-Alta intensidad')],
        verbose_name='Tipo', 
        max_length=70,
        null=False,
        blank=False)
    
    intensidad = models.CharField(
        choices=[('Sedentario','Sedentario'),('Sedentario o actividad ligera','Sedentario o actividad ligera'),
                 ('Activo o actividad moderada','Activo o actividad moderada'),
                 ('Vigoroso o actividad fuerte','Vigoroso o actividad fuerte')],
        verbose_name='Intensidad', 
        null=False,
        max_length=60,
        blank=False)
    
    frecuencia = models.CharField(
        choices=[('Sin actividad','Sin actividad'),('3 Hrs/Sem','3 Hrs/Sem'),
                 ('6 Hrs/Sem','6 Hrs/Sem'),
                 ('4-5 Hrs/Día','4-5 Hrs/Día')],
        verbose_name='Frecuencia', 
        null=False,
        max_length=50,
        blank=False)
    duracion = models.IntegerField(verbose_name='Duración')
    recomendacion = models.CharField(max_length=10, verbose_name='Recomendación')
    fc_actividad = models.DecimalField(verbose_name='Fc. Actividad',  max_digits=6, decimal_places=2)

    # Antecedentes Familiares y Personales 
    diabetes = models.CharField(
        choices=[('DM Familiar','DM Familiar'),('DM Personal','DM Personal'),
                 ('Ambos','Ambos'),
                 ('Ninguna','Ninguna')],
        verbose_name='Diabetes', 
        max_length=50,
        null=False,
        blank=False)
    
    enf_coronarias = models.CharField(
        choices=[('(CHD) Familiar','(CHD) Familiar'),('(CHD) Personal','(CHD) Personal'),
                 ('Ambos','Ambos'),
                 ('Ninguna','Ninguna')],
        verbose_name='Enf. Coronarias', 
        max_length=50,
        null=False,
        blank=False)
    
    hipertension = models.CharField(
        choices=[('HTA Familiar','HTA Familiar'),('HTA Personal','HTA Personal'),
                 ('Ambos','Ambos'),
                 ('Ninguna','Ninguna')],
        verbose_name='Hipertensión',
        max_length=50, 
        null=False,
        blank=False)
    
    obesidad = models.CharField(
        choices=[('Obesidad Familiar','Obesidad Familiar'),('Obesidad Personal','Obesidad Personal'),
                 ('Ambos','Ambos'),
                 ('Ninguna','Ninguna')],
        verbose_name='Obesidad', 
        max_length=50,
        null=False,
        blank=False)
    
    dislipidemia = models.CharField(
        choices=[('Dislipidemia Familiar','Dislipidemia Familiar'),('Dislipidemia Personal','Dislipidemia Personal'),
                 ('Ambos','Ambos'),
                 ('Ninguna','Ninguna')],
        verbose_name='Dislipidemia',
        max_length=50, 
        null=False,
        blank=False)
    
    # Evaluación Antropométrica (OMS)
    peso_actual = models.DecimalField(verbose_name='Peso Actual (Kg)', decimal_places=2,max_digits=10)

    talla = models.DecimalField(max_digits=10, decimal_places=2,verbose_name='Talla (m)')

    p_brazo_contraido = models.DecimalField(max_digits=10,decimal_places=2,verbose_name='P. Brazo contraido(cm)')

    d_humero = models.DecimalField(max_digits=10,decimal_places=2,verbose_name='D.Húmero (cm)')

    p_pantorrilla = models.DecimalField(max_digits=10,decimal_places=2,verbose_name='P. Pantorilla (cm)')

    d_femur = models.DecimalField(max_digits=10,decimal_places=2,verbose_name='D. Femur (cm)')

    pliegue_suprespinal = models.DecimalField(max_digits=10,decimal_places=2,verbose_name='Pliegue Suprespinal(mm)')

    pliegue_pantorilla = models.DecimalField(max_digits=10,decimal_places=2,verbose_name='Pliegue  Pantorilla(mm)')

    indice_ponderal = models.DecimalField(max_digits=10, decimal_places=2,  verbose_name='Índice Ponderal')

    peso_ideal = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Peso Ideal IMC=22.4')


    imc = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='IMC (OMS)')


    tipo_obesidad = models.CharField(max_length=100, verbose_name='Tipo Ob.')

    cir_brazo = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Circ. 1/2 Brazo CB (cm)')

    cintura = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Cintura ATP III: ♂ ≥102, ♀ ≥ 88(cm) IDF: ♂ ≥ 98 ♀ ≥ 88')

    p_abdominal = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Perímetro Abdominal(cm)')

    cadera = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Cadera(cm)')

    recto_leu = models.IntegerField(verbose_name='Rcto. Leu./Ul')

    icc = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='ICC: ≥ ♂ 0.95 ♀ ≥ 85')

    ice = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='ICE: ♂ ♀ > 0.5')
  
    #Falta 
    circunferencia_carpo = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Circunferencia del Carpo (cm)')

    albumina = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Albumina (g/dL)')
    pliegue_triccipital = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Pliegue Triccipital (mm)')
    obesidad_central = models.CharField(
        choices=[('Si','Si'),('No','No')],
        max_length=2,
        default='No',
        verbose_name='Obesidad Central (Obc)', 
        null=False,
        blank=False)

    pliegue_biccipital = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Pliegue Biccipital(mm)')

    trigliceridos = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Triglicéridos')

    pliegue_subescapular = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Pliegue Subescapular(mm)')

    c_HDL = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='c-HDL')
    pliegue_suprailiaco = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Pliegue Suprailiaco(mm)')

    #Requerimiento Energético 
    formula = models.CharField(
        choices=[('OMS','OMS'),('Harris Benedict','Harris Benedict')],
        max_length=30,
        verbose_name='Fórmula a Utilizar', 
        null=False,
        blank=False)
    calorias_requeridas = models.IntegerField(verbose_name='Calorías Requeridas')
    calorias_a_planificar = models.IntegerField(verbose_name='Calorías a Planificar')
    ingesta_calorica = models.IntegerField(verbose_name='Ing. Calórica')
    adecuacion_ingesta = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='% Adecuación Ingesta')
    porcentaje_GET = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='%  Calorías a planificar = %GET')


    def __str__(self):
            return self.nombre

    class Meta:
            verbose_name_plural = "Pacientes"