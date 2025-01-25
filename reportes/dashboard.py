
from django.shortcuts import render
from django.views import View
from alimentos.models import Alimento
from pacientes.models import Paciente
from planes_dieteticos.models import PlanDietetico
import plotly.graph_objects as go
from django.db.models import Count

class MyCustomDashboard(View):
    template_name = '../templates/admin/custom_dashboard.html'

    def get(self, request, *args, **kwargs):
        total_alimentos = Alimento.objects.count()
        total_pacientes = Paciente.objects.count()
        total_planes = PlanDietetico.objects.count()

        age_ranges = {
            '0-20': Paciente.objects.filter(edad__lte=20).count(),
            '21-30': Paciente.objects.filter(edad__gte=21, edad__lte=30).count(),
            '31-50': Paciente.objects.filter(edad__gte=31, edad__lte=50).count(),
            '51+': Paciente.objects.filter(edad__gte=51).count(),
        }

        # Gráfico de barras 
        fig = go.Figure(data=[go.Bar(
            x=list(age_ranges.keys()),  
            y=list(age_ranges.values()),
            marker=dict(color=['#636EFA', '#EF553B', '#00CC96', '#AB63FA']),
        )])

        fig.update_layout(
            autosize=True,
            height=250, 
            xaxis_title="Rango de Edad",
            yaxis_title="Número de Pacientes",
            template="plotly_white"
        )

        bar_config = {
            'displayModeBar': True,
            'displaylogo': False,
            'modeBarButtonsToRemove': ['lasso2d', 'select2d']
        }
        graph_html = fig.to_html(full_html=False, config=bar_config)

        gender_data = {
            'Masculino': Paciente.objects.filter(genero='M').count(),
            'Femenino': Paciente.objects.filter(genero='F').count()
        }

        # Gráfico circular 
        pie_fig = go.Figure(data=[go.Pie(
            labels=list(gender_data.keys()),
            values=list(gender_data.values()),  
            marker=dict(colors=['#636EFA', '#EF553B']),  
            hole=0.3  
        )])

        pie_fig.update_layout(
            autosize=True,
            height=250,
            template="plotly_white"
        )

        pie_config = {
            'displayModeBar': True,  
            'displaylogo': False,  
            'modeBarButtonsToRemove': ['lasso2d', 'select2d']  
        }
        pie_graph_html = pie_fig.to_html(full_html=False, config=pie_config)

        # Gráfico de Area
    
        pacientes_frecuentes = PlanDietetico.objects.values('paciente').annotate(frequency=Count('paciente')).order_by('-frequency')
        patient_names = []
        frequencies = []

        for paciente in pacientes_frecuentes:
            patient = Paciente.objects.get(id=paciente['paciente'])
            patient_names.append(f"{patient.nombre}")  
            frequencies.append(paciente['frequency'])

        print(patient_names, frequencies)

        area_fig = go.Figure(data=[go.Scatter(
            x=patient_names,
            y=frequencies,
            mode='lines',  
            fill='tozeroy',  
            line=dict(color='#00CC96')
        )])

        area_fig.update_layout(
            autosize=True,
            height=250,
            xaxis_title="Pacientes",
            yaxis_title="Frecuencia",
            template="plotly_white",
            xaxis_tickangle=-45  
        )

        area_config = {
            'displayModeBar': True,
            'displaylogo': False,
            'modeBarButtonsToRemove': ['lasso2d', 'select2d']
        }
        area_graph_html = area_fig.to_html(full_html=False, config=area_config)


        context = {
            'total_alimentos': total_alimentos,
            'total_pacientes': total_pacientes,
            'total_planes': total_planes,
            'graph_html': graph_html , 
            'pie_graph_html': pie_graph_html,
            'area_graph_html': area_graph_html
        }

        return render(request, self.template_name, context)
