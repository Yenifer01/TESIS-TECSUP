document.addEventListener('DOMContentLoaded', function () {
    const pacienteField = $('#id_paciente');  
    const objetivoField = $('#id_objetivo'); 
    const formulaField = $('#id_formula');   
    const caloriasRequeridasField = $('#id_calorias_requeridas'); 

    // Objeto centralizado para almacenar los datos
    const calculosPaciente = {
        fcActividad: null,
        omsResultado: null,
        tmbResultado: null
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
                        calculosPaciente.fcActividad = data.fc_actividad;
                        calculosPaciente.omsResultado = calcularOMS(edad, genero, pesoActual);
                        calculosPaciente.tmbResultado = calcularHarrisBenedict(edad, genero, pesoActual, altura);
                        if (data.paciente_desea) {
                            objetivoField.val(data.paciente_desea).trigger('change');
                        } else {
                            objetivoField.val('').trigger('change');
                        }
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
                oms = 60.9 * pesoActual - 0.97;
            } else if (edad >= 3 && edad <= 10) {
                oms = 22.7 * pesoActual + 495;
            } else if (edad >= 10 && edad <= 18) {
                oms = 17.5 * pesoActual + 651;
            } else if (edad >= 18 && edad <= 30) {
                oms = 15.3 * pesoActual + 679;
            } else if (edad >= 30 && edad <= 60) {
                oms = 11.6 * pesoActual + 879;
            } else if (edad > 60) {
                oms = 10.5 * pesoActual + 596;
            }
        } else if (genero === 'F') {
            if (edad >= 0 && edad <= 3) {
                oms = 61 * pesoActual - 51;
            } else if (edad >= 3 && edad <= 10) {
                oms = 22.5 * pesoActual + 499;
            } else if (edad >= 10 && edad <= 18) {
                oms = 12.2 * pesoActual + 746;
            } else if (edad >= 18 && edad <= 30) {
                oms = 14.7 * pesoActual + 496;
            } else if (edad >= 30 && edad <= 60) {
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
});
