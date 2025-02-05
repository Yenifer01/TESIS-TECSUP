
document.addEventListener('DOMContentLoaded', function () {
    const modalController = {
        openModal: (modalId) => {
            modalController.scrollPosition = window.scrollY;
            
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "block";
            }
        },
        closeModal: (modalId) => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = "none";
            }
            
            window.scrollTo(0, modalController.scrollPosition);
        },
        closeModalOnOutsideClick: (event, modalId) => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                modalController.closeModal(modalId);
            }
        }
    };
    function setupModal(modalId, openButtonId, closeButtonClass) {
        const openModalButton = document.getElementById(openButtonId);
        if (openModalButton) {
            openModalButton.addEventListener("click", () => modalController.openModal(modalId));
        }
    
        const closeModalButton = document.querySelector(`#${modalId} .${closeButtonClass}`);
        if (closeModalButton) {
            closeModalButton.addEventListener("click", () => modalController.closeModal(modalId));
        }
    
        window.addEventListener("click", (event) => modalController.closeModalOnOutsideClick(event, modalId));
    }
    setupModal("modalIndicePonderal", "indicePonderalInfo", "close");
    setupModal("modalPesoIdeal", "pesoIdealInfo", "close");
    setupModal("modalImc", "imcInfo", "close");
    setupModal("modalTipoObesidad", "TipoObesidadInfo", "close");
    setupModal("modalIcc", "iccInfo", "close");
    setupModal("modalIce", "iceInfo", "close");
    


    //Funcionalidad para calcular el número de cigarrillos 
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
    
    //Funcionalidad  para calcular la intensidad 
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
    const modalIndiceP = document.querySelector('#modalIndiceP');
    
    if (pesoActualField.length && tallaField.length && indicePonderalField) {
        function calcularIndicePonderal() {
            const pesoActual = parseFloat(pesoActualField.val()); 
            const talla = parseFloat(tallaField.val()); 

            if (!isNaN(pesoActual) && pesoActual > 0 && !isNaN(talla) && talla > 0) {
    
                const indicePonderal = (talla * 100) / Math.cbrt(pesoActual);
                indicePonderalField.value = indicePonderal.toFixed(2); 
                


                const contenidoModal = `
                <h6>Detalles del Cálculo:</h6>
                <div>
                    <p><strong>Valores:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><strong>Peso Actual:</strong> ${pesoActual} kg</li>
                        <li><strong>Talla:</strong> ${talla.toFixed(2)} m</li>
                    </ul>
                </div>
                <div>
                    <p><strong>Cálculo:</strong></p>
                    <p>(${talla.toFixed(2)} * 100) / ∛(${pesoActual}) = <strong>${indicePonderal.toFixed(2)}</strong></p>
                </div>
                <div>
                    <p><strong>Índice Ponderal:</strong> <span style="font-weight: bold; color: #343a40;">${indicePonderal.toFixed(2)}</span></p>
                </div>
            `;
            if (modalIndiceP) {
                modalIndiceP.innerHTML = contenidoModal;
            }

            } else {
                indicePonderalField.value = ''; 
            }
        }
        pesoActualField.on('input change', calcularIndicePonderal); 
        tallaField.on('input change', calcularIndicePonderal); 
    }
    


    // Función para calcular el peso ideal IMC = 22.4
    const pesoIdealField = $('#id_peso_ideal');
    const modalPesoI = document.querySelector('#modalPesoI');

    if (tallaField.length && pesoIdealField.length) {
        tallaField.on('input change', function () {
            const talla = parseFloat(tallaField.val()); 

            if (!isNaN(talla) && talla > 0) {
                const pesoIdeal = talla * talla * 22.4;
                pesoIdealField.val(pesoIdeal.toFixed(2)); 

                const contenidoModal = `
                <h6>Detalles del Cálculo:</h6>
                <div>
                    <p><strong>Valores:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><strong>Talla:</strong> ${talla.toFixed(2)} m</li>
                    </ul>
                </div>
                <div>
                    <p><strong>Cálculo:</strong></p>
                    <p>(${talla.toFixed(2)} * ${talla.toFixed(2)})*22.4 = <strong>${pesoIdeal.toFixed(2)}</strong></p>
                </div>
                <div>
                    <p><strong>Peso Ideal:</strong> <span style="font-weight: bold; color: #343a40;">${pesoIdeal.toFixed(2)}</span></p>
                </div>
            `;
            if (modalPesoI) {
                modalPesoI.innerHTML = contenidoModal;
            }

            } else {
                pesoIdealField.val(''); 
            }
        });
    }
     // Función para calcular el IMC y clasificar el tipo de obesidad
    const imcField = $('#id_imc');
    const tipoObesidadField = $('#id_tipo_obesidad'); 
    const modalIMC = document.querySelector('#modalIMC');
    const modalTipo = document.querySelector('#modalTipo');
 
     if (pesoActualField.length && tallaField.length && imcField.length && tipoObesidadField.length) {
         function calcularIMC() {
             const pesoActual = parseFloat(pesoActualField.val()); 
             const talla = parseFloat(tallaField.val()); 
             if (!isNaN(pesoActual) && pesoActual > 0 && !isNaN(talla) && talla > 0) {
                const imc = pesoActual / (talla * talla);
                imcField.val(imc.toFixed(2)); 

                const contenidoIMC = `
                    <h6>Detalles del Cálculo:</h6>
                    <div>
                        <p><strong>Valores:</strong></p>
                        <ul style="list-style-type: disc; padding-left: 20px;">
                            <li><strong>Peso:</strong> ${pesoActual} kg</li>
                            <li><strong>Talla:</strong> ${talla.toFixed(2)} m</li>
                        </ul>
                    </div>
                    <div>
                        <p><strong>Cálculo:</strong></p>
                        <p>${pesoActual} / (${talla.toFixed(2)} * ${talla.toFixed(2)}) = <strong>${imc.toFixed(2)}</strong></p>
                    </div>
                    <div>
                        <p><strong>Índice de Masa Corporal (IMC):</strong> 
                        <span style="font-weight: bold; color: #343a40;">${imc.toFixed(2)}</span></p>
                    </div>
                `;
                if (modalIMC) {
                    modalIMC.innerHTML = contenidoIMC;
                }


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

             const contenidoTipoObesidad = `
                <h6>Clasificación del IMC:</h6>
                <div>
                    <p><strong>IMC (OMS):</strong> <span style="font-weight: bold; color: #343a40;">${imc.toFixed(2)}</span></p>
                </div>
                <div>
                    <p><strong>Clasificación IMC:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li>< 16: <span style="color: red;">Delgadez Severa</span></li>
                        <li>16 - 16.9: <span style="color: orange;">Delgadez Moderada</span></li>
                        <li>17 - 18.4: <span style="color: yellow;">Delgadez Leve</span></li>
                        <li>18.5 - 24.9: <span style="color: green;">Normo peso</span></li>
                        <li>25 - 29.9: <span style="color: orange;">Pre-obesidad (Sobrepeso)</span></li>
                        <li>30 - 34.9: <span style="color: red;">Obesidad Clase I</span></li>
                        <li>35 - 39.9: <span style="color: darkred;">Obesidad Clase II</span></li>
                        <li>≥ 40: <span style="color: darkred; font-weight: bold;">Obesidad Clase III</span></li>
                    </ul>
                </div>
            `;
            if (modalTipo) {
                modalTipo.innerHTML = contenidoTipoObesidad;
            }
         }
 
         pesoActualField.on('input change', calcularIMC); 
         tallaField.on('input change', calcularIMC); 
     }

     //  Función para calcular ICC
    const cinturaField = $('#id_cintura'); 
    const caderaField = $('#id_cadera'); 
    const iccField = document.querySelector('#id_icc'); 
    const modalicc = document.querySelector('#modalicc');
    if (cinturaField.length && caderaField.length && iccField) {
        function calcularIcc() {
            const cintura = parseFloat(cinturaField.val()); 
            const cadera = parseFloat(caderaField.val()); 

            if (!isNaN(cintura) && cintura > 0 && !isNaN(cadera) && cadera > 0) {
                const icc = cintura/cadera
                iccField.value = icc.toFixed(2); 
                const contenidoModal = `
                <h6>Detalles del Cálculo:</h6>
                <div>
                    <p><strong>Valores:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><strong>Cintura:</strong> ${cintura} cm</li>
                        <li><strong>Cadera:</strong> ${cadera} cm</li>
                    </ul>
                </div>
                <div>
                    <p><strong>Cálculo:</strong></p>
                    <p>(${cintura} /${cadera})= <strong>${icc.toFixed(2)}</strong></p>
                </div>
                <div>
                    <p><strong>ICC:</strong> <span style="font-weight: bold; color: #343a40;">${icc.toFixed(2)}</span></p>
                </div>
            `;
            if (modalicc) {
                modalicc.innerHTML = contenidoModal;
            }
            } else {
                iccField.value = ''; 
            }
        }
        cinturaField.on('input change', calcularIcc); 
        caderaField.on('input change', calcularIcc); 
    }

    // Función para calcular  ICE
    const iceField = $('#id_ice');
    const modalice = document.querySelector('#modalice');
    if (tallaField.length && cinturaField.length && iceField.length) {
        function calcularIce() {
            const talla = parseFloat(tallaField.val()); 
            const cintura = parseFloat(cinturaField.val()); 

            if (!isNaN(talla) && talla > 0 && !isNaN(cintura) && cintura > 0) {
                const ice = cintura / (talla * 100); 
                iceField.val(ice.toFixed(2)); 

                const contenidoModal = `
                <h6>Detalles del Cálculo:</h6>
                <div>
                    <p><strong>Valores:</strong></p>
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><strong>Talla:</strong> ${talla.toFixed(2)} m</li>
                        <li><strong>Cintura:</strong> ${cintura} cm</li>
                    </ul>
                </div>
                <div>
                    <p><strong>Cálculo:</strong></p>
                    <p>(${cintura} /${talla.toFixed(2)})= <strong>${ice.toFixed(2)}</strong></p>
                </div>
                <div>
                    <p><strong>ICE:</strong> <span style="font-weight: bold; color: #343a40;">${ice.toFixed(2)}</span></p>
                </div>
            `;
            if (modalice) {
                modalice.innerHTML = contenidoModal;
            }

            } else {
                iceField.val(''); 
            }
        }
        tallaField.on('input change', calcularIce); 
        cinturaField.on('input change', calcularIce); 
    }

    });
