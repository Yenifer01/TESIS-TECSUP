
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
    
    // funcionalidad para intensidad 
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
        //Calcular el indice Ponderal
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
    
    // Calcular el peso ideal IMC = 22.4
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

     // Calcular el IMC y clasificar el tipo de obesidad
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

     // Calcular ICC
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

    //Calcular ICE
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
});
