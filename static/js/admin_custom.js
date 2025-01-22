
document.addEventListener('DOMContentLoaded', function () {
    const tabacoField = $('#id_tabaco');  
    const numeroCigDiaField = document.querySelector('#id_numero_cig_dia'); 
    const fcActividadField = document.querySelector('#id_fc_actividad'); 

    if (numeroCigDiaField) {
        numeroCigDiaField.setAttribute('placeholder', 'Se agregará 0 si Tabaco = NO(-)');
    }

    if (fcActividadField) {
        fcActividadField.setAttribute('placeholder', 'Escoger un promedio de Recomendación');
    }
    if (tabacoField.length && numeroCigDiaField) {
        tabacoField.on('change', function () {
            const selectedValue = tabacoField.val();  
            if (selectedValue === 'No(-)') {
                numeroCigDiaField.value = 0;
            } else if (numeroCigDiaField.value == 0) {
                numeroCigDiaField.value = '';
            }
        });
    }
    
    //Función para calcular intensidad 
    const intensidadField = $('#id_intensidad');
    const recomendacionField = document.querySelector('#id_recomendacion');

    if (intensidadField.length && recomendacionField) {
        intensidadField.on('change', function () {
            const selectedValue = intensidadField.val();

            if (selectedValue === 'Sedentario') {
                recomendacionField.value = '1.2 a 1.39';
            } else if (selectedValue === 'Sedentario o actividad ligera') {
                recomendacionField.value = '1.4 a 1.69';
            } else if (selectedValue === 'Activo o actividad moderada') {
                recomendacionField.value = '1.7 a 1.99';
            } else if (selectedValue === 'Vigoroso o actividad fuerte') {
                recomendacionField.value = '2.0 a 2.4';
            } else {
                recomendacionField.value = ''; 
            }
        });
    }
        // Función para calcular el indice Ponderal
    const pesoActualField = $('#id_peso_actual'); 
    const tallaField = $('#id_talla'); 
    const indicePonderalField = document.querySelector('#id_indice_ponderal'); 
    if (pesoActualField.length && tallaField.length && indicePonderalField) {
        function calcularIndicePonderal() {
            const pesoActual = parseFloat(pesoActualField.val()); 
            const talla = parseFloat(tallaField.val()); 

            if (!isNaN(pesoActual) && pesoActual > 0 && !isNaN(talla) && talla > 0) {
    
                const indicePonderal = (talla * 100) / Math.cbrt(pesoActual);
                indicePonderalField.value = indicePonderal.toFixed(2); 
            } else {
                indicePonderalField.value = ''; 
            }
        }
        pesoActualField.on('input change', calcularIndicePonderal); 
        tallaField.on('input change', calcularIndicePonderal); 
    }
    
    // Función para calcular el peso ideal IMC = 22.4
    const pesoIdealField = $('#id_peso_ideal');

    if (tallaField.length && pesoIdealField.length) {
        tallaField.on('input change', function () {
            const talla = parseFloat(tallaField.val()); 

            if (!isNaN(talla) && talla > 0) {
                const pesoIdeal = talla * talla * 22.4;
                pesoIdealField.val(pesoIdeal.toFixed(2)); 
            } else {
                pesoIdealField.val(''); 
            }
        });
    }
     // Función para calcular el IMC y clasificar el tipo de obesidad
     const imcField = $('#id_imc');
     const tipoObesidadField = $('#id_tipo_obesidad'); 
 
     if (pesoActualField.length && tallaField.length && imcField.length && tipoObesidadField.length) {
         function calcularIMC() {
             const pesoActual = parseFloat(pesoActualField.val()); 
             const talla = parseFloat(tallaField.val()); 
             if (!isNaN(pesoActual) && pesoActual > 0 && !isNaN(talla) && talla > 0) {
                 const imc = pesoActual / (talla * talla);
                 imcField.val(imc.toFixed(2)); 
                 clasificarIMC(imc); 
             } else {
                 imcField.val(''); 
                 tipoObesidadField.val(''); 
             }
         }
 
         function clasificarIMC(imc) {
             const limites = [16, 17, 18.5, 25, 30, 35, 40];
             const categorias = [
                 "Delgadez Severa",
                 "Delgadez Moderada",
                 "Delgadez Leve",
                 "Normo peso",
                 "Pre-obesidad (Sobrepeso)",
                 "Obesidad clase I",
                 "Obesidad clase II",
                 "Obesidad clase III"
             ];
 
             let categoria = categorias[categorias.length - 1]; 
             for (let i = 0; i < limites.length; i++) {
                 if (imc < limites[i]) {
                     categoria = categorias[i];
                     break;
                 }
             }
             tipoObesidadField.val(categoria); 
         }
 
         pesoActualField.on('input change', calcularIMC); 
         tallaField.on('input change', calcularIMC); 
     }

     //  Función para calcular ICC
    const cinturaField = $('#id_cintura'); 
    const caderaField = $('#id_cadera'); 
    const iccField = document.querySelector('#id_icc'); 
    if (cinturaField.length && caderaField.length && iccField) {
        function calcularIcc() {
            const cintura = parseFloat(cinturaField.val()); 
            const cadera = parseFloat(caderaField.val()); 

            if (!isNaN(cintura) && cintura > 0 && !isNaN(cadera) && cadera > 0) {
                const icc = cintura/cadera
                iccField.value = icc.toFixed(2); 
            } else {
                indicePonderalField.value = ''; 
            }
        }
        cinturaField.on('input change', calcularIcc); 
        caderaField.on('input change', calcularIcc); 
    }

    // Función para calcular  ICE
    const iceField = $('#id_ice');
    if (tallaField.length && cinturaField.length && iceField.length) {
        function calcularIce() {
            const talla = parseFloat(tallaField.val()); 
            const cintura = parseFloat(cinturaField.val()); 

            if (!isNaN(talla) && talla > 0 && !isNaN(cintura) && cintura > 0) {
                const ice = cintura / (talla * 100); 
                iceField.val(ice.toFixed(2)); 
            } else {
                iceField.val(''); 
            }
        }
        tallaField.on('input change', calcularIce); 
        cinturaField.on('input change', calcularIce); 
    }

    
    const edadField = $('#id_edad');
    const generoField = $('#id_genero');
    const fc_ActividadField = $('#id_fc_actividad');
    const formulaField = $('#id_formula');
    const caloriasRequeridasField = document.querySelector('#id_calorias_requeridas');

    // Función para calcular OMS
    function calcularOMS() {
        const edad = parseInt(edadField.val());
        const genero = generoField.val();
        const pesoActual = parseFloat(pesoActualField.val());

        if (!isNaN(pesoActual) && pesoActual > 0 && !isNaN(edad) && edad > 0 && genero) {
            let oms = 0;

            if (genero === 'M') {
                if (edad >= 0 && edad <= 3) {
                    oms = 60.9 * pesoActual + (-0.97);
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
                    oms = 61 * pesoActual + (-51);
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
        return 0;
    }

        // Función para calcular Harris-Benedict (TMB)
    function calcularHarrisBenedict() {
        const edad = parseInt(edadField.val());
        const genero = generoField.val();
        const pesoActual = parseFloat(pesoActualField.val());
        const altura = parseFloat(tallaField.val());  

        if (!isNaN(pesoActual) && pesoActual > 0 && !isNaN(edad) && edad > 0 && !isNaN(altura) && altura > 0 && genero) {
            let tmb = 0;
            if (genero === 'M') {
                tmb = 66.473 + (13.751 * pesoActual) + (5.0033 * (altura*100)) - (6.55 * edad);
            } else if (genero === 'F') {
                tmb = 655.1 + (9.463 * pesoActual) + (1.8 * (altura*100)) - (4.6756 * edad);
            }
            return tmb;
        }
        return 0;  
    }
    
    // Función para calcular calorías requeridas
    function calorias_requeridas() {
        const formula = formulaField.val();
        const fc_actividad = parseFloat(fc_ActividadField.val());

        if (formula === 'OMS' && !isNaN(fc_actividad)) {
            const calorias = calcularOMS() * fc_actividad;
            caloriasRequeridasField.value = Math.round(calorias);
        } else if (formula === 'Harris Benedict' && !isNaN(fc_actividad)) {
            const calorias = calcularHarrisBenedict() * fc_actividad;
            caloriasRequeridasField.value = Math.round(calorias);
        }
    }

    // Función para actualizar valores (solo actualiza calorías requeridas)
    function actualizarValores() {
        calorias_requeridas();
    }

    // Asociar los eventos solo para calcular calorías requeridas
    pesoActualField.on('input change', actualizarValores);
    fc_ActividadField.on('input change', actualizarValores);
    formulaField.on('input change', actualizarValores);


    });
