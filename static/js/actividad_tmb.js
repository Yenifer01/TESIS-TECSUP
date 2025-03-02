document.addEventListener('DOMContentLoaded', function(){
    const pacienteField = $('#id_paciente');  
    const formulaField = $('#id_formula');  
   
    const calculosPaciente = {
        omsResultado: null,
        tmbResultado: null,
        schofieldResultado: null,
        peso6Meses: null,
        pesoActual: null
    };
    if (pacienteField.length) {
        pacienteField.on('select2:select', function (e) {
            const pacienteId = $(this).val();  

            if (pacienteId) {
                fetch(`/datos-paciente/${pacienteId}/`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Error en la solicitud');
                        }
                        return response.json();
                    })
                    .then(data => {
                        const edad = data.edad;
                        const genero = data.genero;
                        const pesoActual = data.peso;
                        const altura = data.talla;
                        const peso6Meses = data.peso_6_meses; 
                        pacienteField.data('edad', edad);
                        pacienteField.data('genero', genero);
                        calculosPaciente.pesoActual = pesoActual;
                        calculosPaciente.peso6Meses = peso6Meses;
                      
                        calculosPaciente.omsResultado = calcularOMS(edad, genero, pesoActual);
                        calculosPaciente.tmbResultado = calcularHarrisBenedict(edad, genero, pesoActual, altura);
                        calculosPaciente.schofieldResultado = calcularSchofield(edad,genero,pesoActual);
                    })
                    .catch(error => {
                        console.error(error);
                    });
                }
        });
        pacienteField.select2();
    }

    formulaField.on('input change', function () {
        reb();
    });

    function actualizarCoeficiente(endpoint, actividadField) {
        const actividadId = actividadField.val();
        const coeficienteField = actividadField.closest('tr').find('[id$=-coeficiente]');
    
        if (actividadId) {
            fetch(`${endpoint}${actividadId}/`)
                .then(response => response.json())
                .then(data => {
                    coeficienteField.val(data.coeficiente);
                })
                .catch(error => console.error('Error al obtener el coeficiente:', error));
        }
    }
    
    $(document).on('change', '[id^=id_fa_actividades_metabolicas-][id$=-actividad]', function () {
        actualizarCoeficiente('/actividades-metabolicas/', $(this));
    });
    
    $(document).on('change', '[id^=id_fa_actividades_funcionales-][id$=-actividad]', function () {
        actualizarCoeficiente('/actividades-funcionales/', $(this));
    });
    

    $(document).on('input change', '[id^=id_fa_actividades_metabolicas-][id$=-horas_totales]', function () {
        horas_totales();
    });


   function calcularOMS(edad, genero, pesoActual) {
    let oms = 0;

    if (genero === 'M') {
        if (edad >= 0 && edad <= 3) {
            oms = 60.9 * pesoActual - 54;
        } else if (edad > 3 && edad <= 10) {
            oms = 22.7 * pesoActual + 495;
        } else if (edad > 10 && edad <= 18) {
            oms = 17.5 * pesoActual + 651;
        } else if (edad > 18 && edad <= 30) {
            oms = 15.3 * pesoActual + 679;
        } else if (edad > 30 && edad <= 60) {
            oms = 11.6 * pesoActual + 879;
        } else if (edad > 60) {
            oms = 13.5 * pesoActual + 487;
        }
    } else if (genero === 'F') {
        if (edad >= 0 && edad <= 3) {
            oms = 61 * pesoActual - 51;
        } else if (edad > 3 && edad <= 10) {
            oms = 22.5 * pesoActual + 499;
        } else if (edad > 10 && edad <= 18) {
            oms = 12.2 * pesoActual + 746;
        } else if (edad > 18 && edad <= 30) {
            oms = 14.7 * pesoActual + 496;
        } else if (edad > 30 && edad <= 60) {
            oms = 8.7 * pesoActual + 829;
        } else if (edad > 60) {
            oms = 10.5 * pesoActual + 596;
        }
    }
    return oms;
    }

    function calcularHarrisBenedict(edad, genero, pesoActual, altura) {
        let tmb = 0;

        if (genero === 'M') {
            tmb = 66.473 + (13.751 * pesoActual) + (5.0033 * (altura * 100)) - (6.55 * edad);
        } else if (genero === 'F') {
            tmb = 655.1 + (9.463 * pesoActual) + (1.8 * (altura * 100)) - (4.6756 * edad);
        }
        return tmb;
    } 


    function calcularSchofield(edad, genero, pesoActual) {
        let Schofield = 0;
    
        if (genero === 'M') {
            if (edad >= 0 && edad <= 3) {
                Schofield = 59.512 * pesoActual - 30.4;
            } else if (edad > 3 && edad <= 10) {
                Schofield = 22.706 * pesoActual + 504.3;
            } else if (edad > 10 && edad <= 18) {
                Schofield = 17.686 * pesoActual + 658.2;
            } else if (edad > 18 && edad <= 30) {
                Schofield = 15.057 * pesoActual + 692.2;
            } else if (edad > 30 && edad <= 60) {
                Schofield = 11.472 * pesoActual + 873.1;
            } else if (edad > 60) {
                Schofield = 11.711 * pesoActual + 587.7;
            }
        } else if (genero === 'F') {
            if (edad >= 0 && edad <= 3) {
                Schofield = 58.317 * pesoActual - 31.1;
            } else if (edad > 3 && edad <= 10) {
                Schofield = 20.315 * pesoActual + 485.9;
            } else if (edad > 10 && edad <= 18) {
                Schofield = 13.384 * pesoActual + 692.6;
            } else if (edad > 18 && edad <= 30) {
                Schofield = 14.818 * pesoActual + 486.6;
            } else if (edad > 30 && edad <= 60) {
                Schofield = 8.126 * pesoActual + 845.6;
            } else if (edad > 60) {
                Schofield = 9.082 * pesoActual + 658.5;
            }
        }
        return Schofield;
        }
    
    function reb() {
        const formula = formulaField.val();
        const rebField = $('[id^=id_fa_actividades_metabolicas-][id$=-reb]');
        const { omsResultado, tmbResultado, schofieldResultado} = calculosPaciente;

        if (formula === 'OMS' && omsResultado) {
            rebField.val(Math.round(omsResultado));
        } else if (formula === 'Harris Benedict' && tmbResultado) {
            rebField.val(Math.round(tmbResultado));
        } else if (formula === 'Schofield' && schofieldResultado) {
            rebField.val(Math.round(schofieldResultado));
        } else {
            rebField.val('');
        }
    }

    function horas_totales() {
        const factorField = $('#id_factor_por');
        const factor = factorField.val();
        const horasTotalesField = $('[id^=id_fa_actividades_metabolicas-][id$=-horas_totales], [id^=id_fa_actividades_funcionales-][id$=-horas_totales]');

        if (factor === 'Dia') {
            horasTotalesField.val(24);
        } else if (factor === 'Semana') {
            horasTotalesField.val(168);
        } else {
            horasTotalesField.val('');
        }
    }
    $(document).on('change', '#id_factor_por', function () {
        horas_totales();
    });


    function fraccion_tiempo() {
        $('[id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas]').each(function () {
            const cantidadField = $(this);
            const row = cantidadField.closest('tr');  
        
            const horasTotalesField = row.find('[id$=-horas_totales]');
            const fraccionTiempoField = row.find('[id$=-fraccion_tiempo]');

            const h = parseFloat(horasTotalesField.val()) || 0;
            const c = parseFloat(cantidadField.val()) || 0;
    
            if (h > 0 && c > 0) {
                const f = c / h;
                fraccionTiempoField.val(f.toFixed(2));
            } else {
                fraccionTiempoField.val('');
            }
        });
    }

    $(document).on('input change', '[id^=id_fa_actividades_metabolicas-][id$=-horas_totales], [id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas]', function () {
        fraccion_tiempo();
    });

    function subfactor() {
        $('[id^=id_fa_actividades_metabolicas-][id$=-fraccion_tiempo]').each(function () {
            const fraccionTiempoField = $(this);
            const row = fraccionTiempoField.closest('tr');  
        
            const coeficienteField = row.find('[id$=-coeficiente]');
            const subfactorField = row.find('[id$=-subfactor]');

            const f = parseFloat(fraccionTiempoField.val()) || 0;
            const c = parseFloat(coeficienteField.val()) || 0;
    
            if (f > 0 && c > 0) {
                const s = c*f;
                subfactorField.val(s.toFixed(2));
            } else {
                subfactorField.val('');
            }
        });
    }

    $(document).on('input change', '[id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas], [id^=id_fa_actividades_metabolicas-][id$=-coeficiente]', function () {
        subfactor();
    });

    function energia_actividad() {
        $('[id^=id_fa_actividades_metabolicas-][id$=-subfactor]').each(function () {
            const subfactorField = $(this);
            const row = subfactorField.closest('tr');  
        
            const rebField = row.find('[id$=-reb]');
            const energiaField = row.find('[id$=-energia_actividad]')

            const s = parseFloat(subfactorField.val()) || 0;
            const r = parseFloat(rebField.val()) || 0;
      
            if (s > 0 && r > 0) {
                const e = s*r;
                energiaField.val(e.toFixed(0));
            } else {
                energiaField.val('');
            }
        });
    }

    $(document).on('input change', '[id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas], [id^=id_fa_actividades_metabolicas-][id$=-subfactor]', function () {
        energia_actividad();
    });

    function actualizarTotalHoras() {
        if (!document.activeElement.hasAttribute('aria-hidden')) {
            document.activeElement.blur();
        }
        let totalHoras = 0;
        $('[id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas]').each(function () {
            const cantidadHorasField = $(this);
            const row = cantidadHorasField.closest('tr');
            const totalHorasField = row.find('[id$=-total_horas]');
    
            const cantidadHoras = parseFloat(cantidadHorasField.val()) || 0;
            totalHoras += cantidadHoras;
            totalHorasField.val(totalHoras.toFixed(0));
        });
        let maxHoras = parseFloat($('[id$=-horas_totales]').val()) || 0;
    
        setTimeout(() => {
            $(".full-width-alert").remove();
            if (totalHoras >= maxHoras) {
                if ($(".full-width-alert").length === 0) {  
                    $(".border-bottom").after(`  
                        <div class="full-width-alert">
                            <strong>⚠ ¡Atención! </strong> Las horas ya están completas, no puedes agregar más actividades.
                            <span class="full-width-alert-close">&times;</span>
                        </div>
                    `);
                    $(".full-width-alert-close").click(function () {
                        $(this).parent().fadeOut("fast", function () { $(this).remove(); });
                    });
                }
                $(".add-row a").prop("disabled", true); 
            } else {
                $(".add-row a").prop("disabled", false); 
            }
        }, 600);
    }
    $(document).on('input change', '[id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas]', actualizarTotalHoras);

    /* Funcionalidades para Gasto energético Total. (Peso vs Factor de actividad) */
    function actualizarTotalHorasFuncional() {
        if (!document.activeElement.hasAttribute('aria-hidden')) {
            document.activeElement.blur();
        }
        let totalHoras = 0;
        $('[id^=id_fa_actividades_funcionales-][id$=-cantidad_horas]').each(function () {
            const cantidadHorasField = $(this);
            const row = cantidadHorasField.closest('tr');
            const totalHorasField = row.find('[id$=-total_horas]');
    
            const cantidadHoras = parseFloat(cantidadHorasField.val()) || 0;
            totalHoras += cantidadHoras;
            totalHorasField.val(totalHoras.toFixed(0));
        });
        let maxHoras = parseFloat($('[id$=-horas_totales]').val()) || 0;
    
        setTimeout(() => {
            $(".full-width-alert").remove();
            if (totalHoras >= maxHoras) {
                if ($(".full-width-alert").length === 0) {  
                    $(".border-bottom").after(`  
                        <div class="full-width-alert">
                            <strong>⚠ ¡Atención! </strong> Las horas ya están completas, no puedes agregar más actividades.
                            <span class="full-width-alert-close">&times;</span>
                        </div>
                    `);
                    $(".full-width-alert-close").click(function () {
                        $(this).parent().fadeOut("fast", function () { $(this).remove(); });
                    });
                }
                $(".add-row a").prop("disabled", true); 
            } else {
                $(".add-row a").prop("disabled", false); 
            }
        }, 600);
    }
    $(document).on('input change', '[id^=id_fa_actividades_funcionales-][id$=-cantidad_horas]', actualizarTotalHorasFuncional);

    function EnergiaActividadFuncional() {
        $('[id^=id_fa_actividades_funcionales-][id$=-cantidad_horas]').each(function () {
            const cantidadHorasField = $(this);
            const row = cantidadHorasField.closest('tr');  
            const coeficienteField = row.find('[id$=-coeficiente]');
            const energiaField = row.find('[id$=-energia_actividad]')

            const h = parseFloat(cantidadHorasField.val()) || 0;
            const c = parseFloat(coeficienteField.val()) || 0;
      
            if (h > 0 && c > 0) {
                const e = h*60*calculosPaciente.pesoActual*c;
                energiaField.val(e.toFixed(0));
            } else {
                energiaField.val('');
            }
        });
    }

    $(document).on('input change', '[id^=id_fa_actividades_funcionales-][id$=-cantidad_horas], [id^=id_fa_actividades_funcionales-][id$=-coeficiente]', function () {
        EnergiaActividadFuncional();
    });

    function calcularSubfactorCalorias() {
        let totalSubfactorMetabolico = 0;
        let totalCaloriasTMB = 0;

        let subfactores = $('[id^=id_fa_actividades_metabolicas-][id$=-subfactor]');
        let energias = $('[id^=id_fa_actividades_metabolicas-][id$=-energia_actividad]');

        if (subfactores.length === 0 && energias.length === 0) {
            console.warn("No se encontraron elementos que coincidan con el selector.");
            return;
        }
        subfactores.each(function () {
            let subfactorValue = parseFloat($(this).val()) || 0;
            totalSubfactorMetabolico += subfactorValue;
        });
        energias.each(function () {
            let energiaActividadValue = parseFloat($(this).val()) || 0;
            totalCaloriasTMB += energiaActividadValue;
        });

        let caloriasField = $('[id^=id_fa_resumen-][id$=-total_calorias_actividad_tmb]');
        let totalField = $('[id^=id_fa_resumen-][id$=-coeficiente_actividad_tmb]');

        if (totalField.length) {
            totalField.val(totalSubfactorMetabolico.toFixed(2)).trigger('input'); 
        } else {
            console.warn("El campo #gasto-total-actividad-tmb no se encontró en el DOM.");
        }

        if (caloriasField.length) {
            caloriasField.val(totalCaloriasTMB).trigger('input'); 
        } else {
            console.warn("El campo #total-calorias-actividad-tmb no se encontró en el DOM.");
        }
    }
    $(document).on('input change', 
        '[id^=id_fa_actividades_metabolicas-][id$=-cantidad_horas], ' +
        '[id^=id_fa_actividades_metabolicas-][id$=-subfactor], ' +
        '[id^=id_fa_actividades_metabolicas-][id$=-energia_actividad]', 
        calcularSubfactorCalorias
    );

    function TotalEnergiaActividad() {
        let totalEnergia = 0;
        let energiaElementos = $('[id^=id_fa_actividades_funcionales-][id$=-energia_actividad]');
    
        if (energiaElementos.length === 0) {
            console.warn("No se encontraron elementos que coincidan con el selector.");
            return;
        }
        energiaElementos.each(function () {
            let energiaActividadValue = parseFloat($(this).val()) || 0;
            totalEnergia += energiaActividadValue;
        });
        let caloriasField = $('[id^=id_fa_resumen-][id$=-total_calorias_peso_actividad]');
        let coeficienteActividadFisica = $('[id^=id_fa_resumen-][id$=-coeficiente_peso_actividad]');
        let formula = formulaField.val(); 
    
        if (caloriasField.length) {
            caloriasField.val(totalEnergia).trigger('input'); 
            setTimeout(() => {
                if (coeficienteActividadFisica.length) {
                    const { omsResultado, tmbResultado, schofieldResultado} = calculosPaciente;
                    let coeficiente = 0;
    
                    if (formula === 'OMS' && omsResultado) {
                        coeficiente = totalEnergia / omsResultado;
                    } else if (formula === 'Harris Benedict' && tmbResultado) {
                        coeficiente = totalEnergia / tmbResultado;
                    } else if (formula === 'Schofield' && schofieldResultado) {
                        coeficiente = totalEnergia / schofieldResultado;
                    }
                    coeficienteActividadFisica.val(coeficiente ? coeficiente.toFixed(2) : '');
                }
            }, 50); 
        } else {
            console.warn("El campo de calorías no se encontró en el DOM.");
        }
    }
    $(document).on('input change', 
        '[id^=id_fa_actividades_funcionales-][id$=-cantidad_horas], ' +
        '[id^=id_fa_actividades_funcionales-][id$=-energia_actividad]', 
        TotalEnergiaActividad
    );
    






   








    
    
    




   



   
    

    
    
    

   

    
    

   


})

