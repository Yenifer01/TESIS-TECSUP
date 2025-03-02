
from django.shortcuts import render
from django.views import View
import numpy as np
from alimentos.models import Alimento
from pacientes.models import Paciente
from planes_dieteticos.models import PlanDietetico
import plotly.graph_objects as go
from django.db.models import Count
from decimal import Decimal

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

        endomorfia = []
        mesomorfia = []
        ectomorfia = []
        nombres = []
         # Obtener todos los pacientes y calcular valores para cada uno
        pacientes = Paciente.objects.all()

        for paciente in pacientes:
            peso = paciente.peso_actual
            altura = paciente.talla
            pliegue_triceps = paciente.pliegue_triccipital
            pliegue_subescapular = paciente.pliegue_subescapular
            pliegue_supraespinal = paciente.pliegue_suprespinal
            pliegue_pantorilla = paciente.pliegue_pantorilla
            diametro_humero = paciente.d_humero
            diametro_femur = paciente.d_femur
            perimetro_brazo = paciente.p_brazo_contraido
            perimetro_pantorilla = paciente.p_pantorrilla

           # Cálculo de Endomorfia
            E = (pliegue_triceps + pliegue_subescapular + pliegue_supraespinal) * (Decimal('170.18') / (altura * Decimal(100)))
            endo = Decimal('-0.7182') + Decimal('0.1451') * E - Decimal('0.00068') * (E**2) + Decimal('0.0000014') * (E**3)
            endomorfia.append(endo)

            # Cálculo de Mesomorfia
            p_brazo_corregido = perimetro_brazo - (pliegue_triceps / Decimal(10))
            p_pantorilla_corregido = perimetro_pantorilla - (pliegue_pantorilla / Decimal(10))
            meso = (Decimal('0.858') * diametro_humero) + \
                (Decimal('0.601') * diametro_femur) + \
                (Decimal('0.188') * p_brazo_corregido) + \
                (Decimal('0.161') * p_pantorilla_corregido) - \
                (Decimal('0.131') * altura * Decimal(100)) + Decimal('4.5')
            mesomorfia.append(meso)

            # Cálculo de Ectomorfia
            C = (altura * Decimal(100)) / (peso ** Decimal('0.3333333333'))
            if C >= Decimal('40.75'):
                ecto = Decimal('0.732') * C - Decimal('28.58')
            elif Decimal('38.25') <= C < Decimal('40.75'):
                ecto = Decimal('0.463') * C - Decimal('17.63')
            else:
                ecto = Decimal('0.1')

            ectomorfia.append(ecto)
            nombres.append(paciente.nombre)

        # CÁLCULO DE VALORES DE X E Y 
        if endomorfia and ectomorfia:
            X = [float(ecto - endo) for ecto, endo in zip(ectomorfia, endomorfia)]
            Y = [float(2 * meso - (ecto + endo)) for meso, ecto, endo in zip(mesomorfia, ectomorfia, endomorfia)]
        else:
            X = []
            Y = []

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
            height=370,
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

        #Gráfico de Somatocarta
        fig = go.Figure()
        if X and Y:  
            fig.add_trace(go.Scatter(
                x=X,
                y=Y,
                mode='markers+text',
                text=nombres, 
                textposition='top center',
                marker=dict(
                    size=5,
                    color=np.linspace(0, 1, len(nombres)), 
                    colorscale='Viridis',
                    line=dict(color='black', width=1)
                )
            ))
            limite_maximo = 12
           
            fig.add_shape(
                type="line",
                x0=-limite_maximo, x1=limite_maximo,
                y0=0, y1=0,
                line=dict(color="#4D4D4D", width=2)
            )
            fig.add_shape(
                type="line",
                x0=0, x1=0,
                y0=-limite_maximo, y1=limite_maximo,
                line=dict(color="#4D4D4D", width=2)
            )
            fig.update_layout(
                template="plotly_white",
                height=460,  
                width=458,
                xaxis=dict(
                    range=[-limite_maximo, limite_maximo],  
                    dtick=3,
                    zeroline=True,
                    zerolinewidth=2,
                    zerolinecolor='#4D4D4D',
                    showgrid=True
                ),
                yaxis=dict(
                    range=[-limite_maximo, limite_maximo], 
                    dtick=3, 
                    zeroline=True,
                    zerolinewidth=2,
                    zerolinecolor='#4D4D4D',
                    showgrid=True
                ),
                images=[  
                    dict(
                        source="/static/images/somatocarta_individual.png",  
                        xref="paper", yref="paper",  
                        x=0, y=1,  
                        sizex=1, sizey=1,  
                        xanchor="left", yanchor="top",  
                        layer="below"  
                    )
                ]
            )
            scatter_html = fig.to_html(full_html=False, config={'displayModeBar': True})

        context = {
            'total_alimentos': total_alimentos,
            'total_pacientes': total_pacientes,
            'total_planes': total_planes,
            'graph_html': graph_html , 
            'pie_graph_html': pie_graph_html,
            'area_graph_html': area_graph_html,
            'somatocarta_html':  scatter_html
        }
        return render(request, self.template_name, context)
