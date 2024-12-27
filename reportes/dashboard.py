
from django.shortcuts import render, redirect
from django.views import View
from alimentos.models import*
from django.db.models import Count
from django.db.models.functions import TruncMonth
from pacientes.models import*

class MyCustomDashboard(View):
    template_name = '../templates/admin/custom_dashboard.html'

    def get(self, request, *args, **kwargs):
        total_alimentos = Alimento.objects.count()
        total_pacientes = Paciente.objects.count()
       

        context = {
            'total_alimentos': total_alimentos,
            'total_pacientes': total_pacientes,
        }
        return render(request, self.template_name, context)
    
    
    