
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

    // FUNCIÓN PARA CAPTURAR DATOS  DESDE EL FORMULARIO Y CREAR EL SOMATOTIPO
    $('input').on('input', function () {
        let datosCompletos = true;
        const datosFormulario = {
            peso: parseFloat($('#id_peso_actual').val()) || 0,
            talla: parseFloat($('#id_talla').val()) || 1,
            pliegueTricipital: parseFloat($('#id_pliegue_triccipital').val()) || 0,
            pliegueSubescapular: parseFloat($('#id_pliegue_subescapular').val()) || 0,
            pliegueSupraespinal: parseFloat($('#id_pliegue_suprespinal').val()) || 0,
            plieguePantorrilla: parseFloat($('#id_pliegue_pantorilla').val()) || 0,
            diametroHumero: parseFloat($('#id_d_humero').val()) || 0,
            diametroFemur: parseFloat($('#id_d_femur').val()) || 0,
            perimetroBrazo: parseFloat($('#id_p_brazo_contraido').val()) || 0,
            perimetroPantorrilla: parseFloat($('#id_p_pantorrilla').val()) || 0
        };
        
        for (const key in datosFormulario) {
            if (datosFormulario[key] === 0) {
                datosCompletos = false;
                break;
            }
        }
        
        if (datosCompletos) {
            $('.mensaje-inicial').hide();
            $('#grafico-somatocarta').show(); 
            calcularSomatotipoFrontend(datosFormulario);
        } else {
            $('.mensaje-inicial').show(); 
            $('#grafico-somatocarta').hide(); 
        }
    });

    function calcularSomatotipoFrontend(datosFormulario) {
        let triceps = datosFormulario.pliegueTricipital;
        let subescapular = datosFormulario.pliegueSubescapular;
        let supraespinal = datosFormulario.pliegueSupraespinal;
        let altura = datosFormulario.talla;
        
        let E = (triceps + subescapular + supraespinal) * (170.18 / (altura * 100));
        let endo = -0.7182 + 0.1451 * E - 0.00068 * (E ** 2) + 0.0000014 * (E ** 3);

        let p_brazo_corregido = datosFormulario.perimetroBrazo - (triceps / 10);
        let p_pantorilla_corregido = datosFormulario.perimetroPantorrilla - (datosFormulario.plieguePantorrilla / 10);

        let meso = (0.858 * datosFormulario.diametroHumero + 0.601 * datosFormulario.diametroFemur +
            0.188 * p_brazo_corregido + 0.161 * p_pantorilla_corregido - 0.131 * (altura * 100) + 4.5);

        let C = datosFormulario.peso > 0 ? ((altura * 100) / (Math.cbrt(datosFormulario.peso))) : 0;
        let ecto;
        
        if (C >= 40.75) {
            ecto = 0.732 * C - 28.58;
        } else if (C >= 38.25 && C < 40.75) {
            ecto = 0.463 * C - 17.63;
        } else {
            ecto = 0.1;
        }

        let X = parseFloat((ecto - endo).toFixed(2));
        let Y = parseFloat((2 * meso - (ecto + endo)).toFixed(2));

        setTimeout(() => {
            graficarSomatocartaIndividual(X, Y);
        }, 300);
    }

    function graficarSomatocartaIndividual(X, Y) {
        let canvas = document.getElementById('grafico-somatocarta-individual');
        if (!canvas) {
            console.warn("Esperando a que el canvas esté disponible...");
            setTimeout(() => graficarSomatocartaIndividual(X, Y), 500);
            return;
        }
    
        let ctx = canvas.getContext("2d");
        if (window.miGrafico) {
            window.miGrafico.destroy();
        }
        let imagenFondo = new Image();
        imagenFondo.src = imagenURL; 
    
        imagenFondo.onload = function () {
            const fondoPlugin = {
                id: 'fondoImagen',
                beforeDraw: (chart) => {
                    if (imagenFondo.complete) {
                        let ctx = chart.ctx;
                        let { top, left, width, height } = chart.chartArea;
                        ctx.drawImage(imagenFondo, left, top, width, height);
                    }
                }
            };
            window.miGrafico = new Chart(ctx, {
                type: 'scatter',
                data: {
                    datasets: [{
                        label: 'Punto',
                        data: [{ x: X, y: Y }],
                        backgroundColor: 'blue',
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: false,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            min: -15,
                            max: 15,
                            grid: {
                                color: (ctx) => ctx.tick.value === 0 ? 'black' : '#ccc',
                                lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 1
                            },
                            ticks: {
                                stepSize: 1,
                                color: "black",
                                font: { size: 12 },
                                padding: 8,
                                maxRotation: 0,
                                minRotation: 0
                            }
                        },
                        y: {
                            min: -15,
                            max: 15,
                            grid: {
                                color: (ctx) => ctx.tick.value === 0 ? 'black' : '#ccc',
                                lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 1
                            },
                            ticks: {
                                stepSize: 1,
                                color: "black",
                                font: { size: 12 },
                                padding: 8
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false }
                    }
                },
                plugins: [fondoPlugin] 
            });
        };
    }
    

  // FUNCIÓN PARA CREAR EL SOMATOTIPO UNA VEZ GUARDADOS LOS DATOS EN LA BD
    $(".field-num_ficha a").on("click", function (event) {
        event.preventDefault();
        let url = $(this).attr("href");
        let match = url.match(/\/pacientes\/paciente\/(\d+)\/change\//);
        let pacienteId = match ? match[1] : null;
    
            if (pacienteId) {
                window.location.href = `/admin/pacientes/paciente/${pacienteId}/change/`;
            }
        });
        let match = window.location.href.match(/\/pacientes\/paciente\/(\d+)\/change\//);
        let pacienteId = match ? match[1] : null;
    
        if (pacienteId) {
            fetch(`/pacientes/${pacienteId}/`)
                .then(response => {
                    if (!response.ok) throw new Error('Error en la solicitud');
                    return response.json();
                })
                .then(data => {
                    let calculosPaciente = {
                        peso: data.peso_actual,
                        altura: data.talla,
                        pliegue_triceps: data.pliegue_triccipital,
                        pliegue_subescapular: data.pliegue_subescapular,
                        pliegue_supraespinal: data.pliegue_suprespinal,
                        pliegue_pantorilla: data.pliegue_pantorilla,
                        diametro_humero: data.d_humero,
                        diametro_femur: data.d_femur,
                        perimetro_brazo: data.p_brazo_contraido,
                        perimetro_pantorilla: data.p_pantorrilla
                       
                    };
    
                    calcularSomatotipo(calculosPaciente);
                })
                .catch(error => {
                    console.error('Error al obtener datos del paciente:', error);
                });
        }
    
        function calcularSomatotipo(calculosPaciente) {
            let triceps = parseFloat(calculosPaciente.pliegue_triceps) || 0;
            let subescapular = parseFloat(calculosPaciente.pliegue_subescapular) || 0;
            let supraespinal = parseFloat(calculosPaciente.pliegue_supraespinal) || 0;
            let altura = parseFloat(calculosPaciente.altura) || 1;
    
            let E = (triceps + subescapular + supraespinal) * (170.18 / (altura * 100));
            let endo = -0.7182 + 0.1451 * E - 0.00068 * (E ** 2) + 0.0000014 * (E ** 3);
    
            let p_brazo_corregido = calculosPaciente.perimetro_brazo - (calculosPaciente.pliegue_triceps / 10);
            let p_pantorilla_corregido = calculosPaciente.perimetro_pantorilla - (calculosPaciente.pliegue_pantorilla / 10);
            let meso = (0.858 * calculosPaciente.diametro_humero + 0.601 * calculosPaciente.diametro_femur +
                0.188 * p_brazo_corregido + 0.161 * p_pantorilla_corregido - 0.131 * (calculosPaciente.altura * 100) + 4.5);
    
            let C = (calculosPaciente.altura * 100) / (calculosPaciente.peso ** (1 / 3));
            let ecto;
            if (C >= 40.75) {
                ecto = 0.732 * C - 28.58;
            } else if (C >= 38.25 && C < 40.75) {
                ecto = 0.463 * C - 17.63;
            } else {
                ecto = 0.1;
            }
    
            let X = (ecto - endo).toFixed(2);
            let Y = (2 * meso - (ecto + endo)).toFixed(2);
            X = parseFloat(X);
            Y = parseFloat(Y);
    
            setTimeout(() => {
                graficarSomatocarta(X, Y);
            }, 300);
        }
    
        function graficarSomatocarta(X, Y) {
            let canvas = document.getElementById('grafico');
            if (!canvas) {
                console.warn("Esperando a que el canvas esté disponible...");
                setTimeout(() => graficarSomatocarta(X, Y), 500);
                return;
            }
        
            let ctx = canvas.getContext("2d");
            if (window.miGrafico) {
                window.miGrafico.destroy();
            }
        
            let imagenFondo = new Image();
            imagenFondo.src = imagenURL; 
        
            imagenFondo.onload = function () {
                const fondoPlugin = {
                    id: 'fondoImagen',
                    beforeDraw: (chart) => {
                        if (imagenFondo.complete) {
                            let ctx = chart.ctx;
                            let { top, left, width, height } = chart.chartArea;
                            ctx.drawImage(imagenFondo, left, top, width, height);
                        }
                    }
                };
                window.miGrafico = new Chart(ctx, {
                    type: 'scatter',
                    data: {
                        datasets: [{
                            label: 'Punto',
                            data: [{ x: X, y: Y }],
                            backgroundColor: 'blue',
                            pointRadius: 5,
                            pointHoverRadius: 7
                        }]
                    },
                    options: {
                        responsive: false,
                        maintainAspectRatio: false,
                        scales: {
                            x: {
                                min: -15,
                                max: 15,
                                grid: {
                                    color: (ctx) => ctx.tick.value === 0 ? 'black' : '#ccc',
                                    lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 1
                                },
                                ticks: {
                                    stepSize: 1,
                                    color: "black",
                                    font: { size: 12 },
                                    padding: 8,
                                    maxRotation: 0,
                                    minRotation: 0
                                }
                            },
                            y: {
                                min: -15,
                                max: 15,
                                grid: {
                                    color: (ctx) => ctx.tick.value === 0 ? 'black' : '#ccc',
                                    lineWidth: (ctx) => ctx.tick.value === 0 ? 2 : 1
                                },
                                ticks: {
                                    stepSize: 1,
                                    color: "black",
                                    font: { size: 12 },
                                    padding: 8
                                }
                            }
                        },
                        plugins: {
                            legend: { display: false }
                        }
                    },
                    plugins: [fondoPlugin]
                });
            };
        }
});