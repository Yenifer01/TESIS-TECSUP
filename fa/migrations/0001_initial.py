# Generated by Django 4.2.17 on 2024-12-27 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Fa',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
            ],
            options={
                'verbose_name_plural': 'FA',
            },
        ),
    ]