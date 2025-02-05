
document.addEventListener('DOMContentLoaded', function () {
    const pacienteField = $('#id_paciente');  
    const objetivoField = $('#id_objetivo'); 
    const formulaField = $('#id_formula');   
    const caloriasRequeridasField = $('#id_calorias_requeridas'); 
    const caloriasPlanificadasField = $('#id_calorias_a_planificar');

    

    // Objeto centralizado para almacenar los datos
    const calculosPaciente = {
        fcActividad: null,
        omsResultado: null,
        tmbResultado: null,
        peso6Meses: null,
        pesoActual: null
    };
    if (pacienteField.length && objetivoField.length) {
        pacienteField.on('change', function () {
            const pacienteId = pacienteField.val(); 

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

                        calculosPaciente.fcActividad = data.fc_actividad;
                      
                        calculosPaciente.omsResultado = calcularOMS(edad, genero, pesoActual);
                        calculosPaciente.tmbResultado = calcularHarrisBenedict(edad, genero, pesoActual, altura);
                        if (data.paciente_desea) {
                            objetivoField.val(data.paciente_desea).trigger('change');
                        } else {
                            objetivoField.val('').trigger('change');
                        }
                       
                        calcularCaloriasAPlanificar();
                    })
                    .catch(error => {
                        objetivoField.val('').trigger('change');
                    });
            } else {
                objetivoField.val('').trigger('change');
            }
        });
    }
    formulaField.on('input change', function () {
        calorias_requeridas();
    });

    // Función para calcular las calorías requeridas
    function calorias_requeridas() {
        const formula = formulaField.val(); 
        const { fcActividad, omsResultado, tmbResultado } = calculosPaciente;

        if (!fcActividad) {
            return;
        }

        if (formula === 'OMS' && omsResultado) {
            const calorias = omsResultado * fcActividad;
            caloriasRequeridasField.val(Math.round(calorias));
        } else if (formula === 'Harris Benedict' && tmbResultado) {
            const calorias = tmbResultado * fcActividad;
            caloriasRequeridasField.val(Math.round(calorias));
        } else {
            caloriasRequeridasField.val(''); 
        }
    }


    // Función para calcular OMS
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

    // Función para calcular Harris-Benedict (TMB)
    function calcularHarrisBenedict(edad, genero, pesoActual, altura) {
        let tmb = 0;

        if (genero === 'M') {
            tmb = 66.473 + (13.751 * pesoActual) + (5.0033 * (altura * 100)) - (6.55 * edad);
        } else if (genero === 'F') {
            tmb = 655.1 + (9.463 * pesoActual) + (1.8 * (altura * 100)) - (4.6756 * edad);
        }

        return tmb;
    }

    
     // Función para calcular las calorías a planificar
     function calcularCaloriasAPlanificar() {
        let { fcActividad, omsResultado, tmbResultado, pesoActual, peso6Meses } = calculosPaciente;

        fcActividad = parseFloat(fcActividad);
        omsResultado = parseFloat(omsResultado);
        tmbResultado = parseFloat(tmbResultado);
        pesoActual = parseFloat(pesoActual);
        peso6Meses = parseFloat(peso6Meses);

        if (isNaN(fcActividad) || isNaN(omsResultado) || isNaN(tmbResultado) ||
            isNaN(pesoActual) || isNaN(peso6Meses) ) {
            return; 
        }

        const F11 = fcActividad;
        const F14 = (1.52 - 3.20);
        const F10 = F11 + F14;

        const A2 = calcularRangoEdad(pacienteField.data('edad'), pacienteField.data('genero'));
        const F37 = (F10 + A2) * omsResultado;
        const F38 = F37 / 100;
        const F16 = pesoActual - peso6Meses;
        const F36 = (F11 + F14) * F16;
        const caloriasAPlanificar = omsResultado + F38 + F36;
        caloriasPlanificadasField.val(Math.round(caloriasAPlanificar));
    }
    

     // Función para calcular el valor correspondiente al rango de edad 
    function calcularRangoEdad(edad, genero) {
        let rEdad = 0;
        if (genero === 'M') {
            if (edad >= 0 && edad <= 3) {
                rEdad = 60.9;
            } else if (edad > 3 && edad <= 10) {
                rEdad = 22.7;
            } else if (edad > 10 && edad <= 18) {
                rEdad = 17.5; 
            } else if (edad > 18 && edad <= 30) {
                rEdad = 15.3; 
            } else if (edad > 30 && edad <= 60) {
                rEdad = 11.6; 
            } else if (edad > 60) {
                rEdad = 13.5; 
            }
        } else if (genero === 'F') {
            if (edad >= 0 && edad <= 3) {
                rEdad = 61;
            } else if (edad > 3 && edad <= 10) {
                rEdad = 22.5;
            } else if (edad > 10 && edad <= 18) {
                rEdad = 12.2;
            } else if (edad > 18 && edad <= 30) {
                rEdad = 14.7;
            } else if (edad > 30 && edad <= 60) {
                rEdad = 8.7;
            } else if (edad > 60) {
                rEdad = 10.5;
            }
        }
        return rEdad;
    }

    const proteinaField = $('#id_porcentaje_proteina');
    const carbohidratoField = $('#id_porcentaje_carbohidrato');
    const grasaField = $('#id_porcentaje_grasa');
    const tablaMacronutrientes = $('#tabla-macronutrientes');


    function actualizarTabla() {
        const calorias = parseFloat(caloriasPlanificadasField.val()) || 0;
        const proteinaPct = parseFloat(proteinaField.val()) || 0;
        const carboPct = parseFloat(carbohidratoField.val()) || 0;
        const grasaPct = parseFloat(grasaField.val()) || 0;

       
        const sumaPorcentajes = proteinaPct + carboPct;

        if (sumaPorcentajes >= 100) {
            alert("La suma de proteínas y carbohidratos no puede superar el 100%.");
            grasaField.val(0); 
            grasaField.prop('disabled', true);
        } else {
            grasaField.prop('disabled', false);
        }

        if (sumaPorcentajes + grasaPct > 100) {
            alert("La suma total de los porcentajes no puede superar el 100%.");
            grasaField.val(100 - sumaPorcentajes);
        }

        const proteinaKcal = (proteinaPct / 100) * calorias;
        const carboKcal = (carboPct / 100) * calorias;
        const grasaKcal = (grasaPct / 100) * calorias;

        const proteinaGr = proteinaKcal / 4;
        const carboGr = carboKcal / 4;
        const grasaGr = grasaKcal / 9;

        tablaMacronutrientes.html(`
            <table border="1" style="width:100%; text-align:center;">
                <tr>
                    <th>Macronutriente</th>
                    <th>%</th>
                    <th>Kcal</th>
                    <th>Gr</th>
                </tr>
                <tr>
                    <td>Proteínas</td>
                    <td>${proteinaPct}%</td>
                    <td>${proteinaKcal.toFixed(2)}</td>
                    <td>${proteinaGr.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Carbohidratos</td>
                    <td>${carboPct}%</td>
                    <td>${carboKcal.toFixed(2)}</td>
                    <td>${carboGr.toFixed(2)}</td>
                </tr>
                <tr>
                    <td>Grasas</td>
                    <td>${grasaPct}%</td>
                    <td>${grasaKcal.toFixed(2)}</td>
                    <td>${grasaGr.toFixed(2)}</td>
                </tr>
                
                <tr>
                    <td><strong>Total Calorías a Planificar</strong></td>
                    <td></td>
                    <td><strong>${calorias.toFixed(2)}</strong></td>
                    <td></td>
                </tr>
            </table>
        `);
        
    }

    proteinaField.on('input change', actualizarTabla);
    carbohidratoField.on('input change', actualizarTabla);
    grasaField.on('input change', actualizarTabla);
    caloriasPlanificadasField.on('input change', actualizarTabla);

    actualizarTabla(); 


    const switchContenedor = $('#switch-macronutrientes');

    if (switchContenedor.length) {
        switchContenedor.html(`
            <label class="switch">
                <input type="checkbox" id="mySwitch">
                <span class="slider"></span>
            </label>
        `);
    } else {
        
    }

    const switchElement = $('#mySwitch'); 

    if (switchElement.length) {
        switchElement.on('change', function () {
            if ($(this).prop('checked')) {
                mostrarModal();
            }
        });
    } else {
    }

    function mostrarModal() {
        $('#modal-macronutrientes').remove();
        const cal = parseFloat(caloriasPlanificadasField.val()) || 0;
        const proteina = parseFloat(proteinaField.val()) || 0;
        const carbo = parseFloat(carbohidratoField.val()) || 0;
        const grasa = parseFloat(grasaField.val()) || 0;

        // Crear modal
        const modal = $(`
            <div id="modal-macronutrientes" class="modal-overlay">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Distribución por tiempo de comida</h2>
                    <div class="resumen-macros">
                        <h3>${cal} <span>Kcal</span></h3>
                        <span class="macro proteina">${proteina}% Proteína</span>
                        <span class="macro carbo">${carbo}% Carbohidrato</span>
                        <span class="macro grasa">${grasa}% Grasa</span>
                    </div>

                    <button id="cerrar-modal">Cerrar</button>
                </div>
            </div>
        `);
      
        $('body').append(modal);

        $('.close').on('click', function () {
            $('#modal-macronutrientes').remove();
            $('#mySwitch').prop('checked', false);
        });

        $('#cerrar-modal').on('click', function () {
            $('#modal-macronutrientes').remove();
        });
    }
    
});
