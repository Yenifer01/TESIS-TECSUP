# Generated by Django 4.1.13 on 2024-12-21 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Intensidad',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('estilo_vida', models.CharField(max_length=100)),
                ('recomendacion', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'Intensidad',
            },
        ),
        migrations.CreateModel(
            name='Paciente',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('num_ficha', models.CharField(max_length=30, verbose_name='N° Ficha')),
                ('nombre', models.CharField(max_length=100, verbose_name='Nombre')),
                ('edad', models.IntegerField(verbose_name='Edad')),
                ('genero', models.CharField(choices=[('M', 'Masculino'), ('F', 'Femenino')], default='M', max_length=10, verbose_name='Género')),
                ('ocupacion', models.CharField(max_length=155)),
                ('alcohol', models.CharField(choices=[('No(-)', 'No(-)'), ('Si(+)', 'Si(+)'), ('Si(++)', 'Si(++)'), ('Si(+++)', 'Si(+++)')], default='No(-)', max_length=10, verbose_name='Alcohol')),
                ('tabaco', models.CharField(choices=[('No(-)', 'No(-)'), ('Si(+)', 'Si(+)'), ('Si(++)', 'Si(++)'), ('Si(+++)', 'Si(+++)')], default='No(-)', max_length=10, verbose_name='Tabaco')),
                ('numero_cig_dia', models.IntegerField(verbose_name='N° Cig/Dia')),
                ('apetito', models.CharField(choices=[('No(-)', 'No(-)'), ('Si(+)', 'Si(+)'), ('Si(++)', 'Si(++)'), ('Si(+++)', 'Si(+++)')], default='Si(+)', max_length=10, verbose_name='Apetito')),
                ('horas_sueño', models.IntegerField(verbose_name='Hrs. Sueño')),
                ('sed', models.CharField(choices=[('No(-)', 'No(-)'), ('Si(+)', 'Si(+)'), ('Si(++)', 'Si(++)'), ('Si(+++)', 'Si(+++)')], default='Si(+)', max_length=10, verbose_name='Sed')),
                ('peso_6_meses', models.IntegerField(verbose_name='Peso/6Meses')),
            ],
            options={
                'verbose_name_plural': 'Pacientes',
            },
        ),
    ]