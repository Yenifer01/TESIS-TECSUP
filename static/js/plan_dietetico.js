
document.addEventListener('DOMContentLoaded', function () {
    const pacienteField = $('#id_paciente');  
    const formulaField = $('#id_formula');   
    const caloriasRequeridasField = $('#id_calorias_requeridas'); 
    const caloriasPlanificadasField = $('#id_calorias_a_planificar');

    // Objeto para almacenar los cálculos del paciente
    const calculosPaciente = {
        fcActividad: null,
        omsResultado: null,
        tmbResultado: null,
        schofieldResultado: null,
        coeficiente_tmb: null,
        coeficiente_peso: null,
        peso6Meses: null,
        pesoActual: null,
        rango: null
    };

    // Evento cuando cambia el paciente seleccionado
    if (pacienteField.length) {
        pacienteField.on('change', function () {
            const pacienteId = pacienteField.val();
            if (!pacienteId) {
                return;
            }
            // Hacer una sola petición a la API para obtener todos los datos del paciente
            fetch(`/pacientes/${pacienteId}/`)
                .then(response => {
                    if (!response.ok) throw new Error('Error en la solicitud');
                    return response.json();
                })
                .then(data => {
                    // Extraer datos del paciente
                    calculosPaciente.pesoActual = data.peso_actual;
                    calculosPaciente.peso6Meses = data.peso_6_meses;
                    calculosPaciente.fcActividad = data.fc_actividad;

                    // Calcular valores con las funciones correspondientes
                    calculosPaciente.omsResultado = calcularOMS(data.edad, data.genero, data.peso_actual);
                    calculosPaciente.tmbResultado = calcularHarrisBenedict(data.edad, data.genero, data.peso_actual, data.talla);
                    calculosPaciente.schofieldResultado = calcularSchofield(data.edad, data.genero, data.peso_actual);
                    calculosPaciente.rango = calcularRangoEdad(data.edad, data.genero);
                    // Extraer coeficientes de "resumen_tmb_peso" dentro de "fa"
                    if (data.fa && data.fa.length > 0 && data.fa[0].resumen_tmb_peso) {
                        const resumen = data.fa[0].resumen_tmb_peso;
                        calculosPaciente.coeficiente_tmb = resumen.coeficiente_actividad_tmb;
                        calculosPaciente.coeficiente_peso = resumen.coeficiente_peso_actividad;
                    }

                    // Llamar a la función que planifica las calorías con los datos obtenidos
                    calcularCaloriasAPlanificar();
                })
                .catch(error => {
                    console.error('Error al obtener datos del paciente:', error);
                });
        });
    }

    formulaField.on('input change', function () {
        calorias_requeridas();
    });

    // Función para calcular las calorías requeridas
    function calorias_requeridas() {
        const formula = formulaField.val(); 
        const { fcActividad, omsResultado, tmbResultado, schofieldResultado} = calculosPaciente;

        if (!fcActividad) {
            return;
        }
        if (formula === 'OMS' && omsResultado) {
            const calorias = omsResultado * fcActividad;
            caloriasRequeridasField.val(Math.round(calorias));
        } else if (formula === 'Harris Benedict' && tmbResultado) {
            const calorias = tmbResultado * fcActividad;
            caloriasRequeridasField.val(Math.round(calorias));
        } else if (formula === 'Schofield' && schofieldResultado) {
            const calorias = schofieldResultado * fcActividad;
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

    
     // Función para calcular las calorías a planificar
    function calcularCaloriasAPlanificar() {
        let { fcActividad, omsResultado, tmbResultado, pesoActual, peso6Meses, coeficiente_tmb, coeficiente_peso,rango} = calculosPaciente;

        fcActividad = parseFloat(fcActividad);
        omsResultado = parseFloat(omsResultado);
        tmbResultado = parseFloat(tmbResultado);
        pesoActual = parseFloat(pesoActual);
        peso6Meses = parseFloat(peso6Meses);
        coeficiente_tmb = parseFloat(coeficiente_tmb);
        coeficiente_peso = parseFloat(coeficiente_peso);
        rango = parseFloat(rango);

        if (isNaN(fcActividad) || isNaN(omsResultado) || isNaN(tmbResultado) ||
            isNaN(pesoActual) || isNaN(peso6Meses) || isNaN(coeficiente_tmb) || isNaN(coeficiente_peso) || isNaN(rango) ) {
            return; 
        }

        const F11 = fcActividad;
        const F14 = coeficiente_peso - coeficiente_tmb;
        const F10 = F11 + F14;

        const A2 = rango;
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

    let proteinaField = $('#id_porcentaje_proteina');
    let carbohidratoField = $('#id_porcentaje_carbohidrato');
    let grasaField = $('#id_porcentaje_grasa');
    let tablaMacronutrientes = $('#tabla-macronutrientes');

    function actualizarTabla() {
        let calorias = parseFloat(caloriasPlanificadasField.val()) || 0;
        let proteinaPct = parseFloat(proteinaField.val()) || 0;
        let carboPct = parseFloat(carbohidratoField.val()) || 0;
        let grasaPct = parseFloat(grasaField.val()) || 0;

       
        let sumaPorcentajes = proteinaPct + carboPct;

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

        let proteinaKcal = (proteinaPct / 100) * calorias;
        let carboKcal = (carboPct / 100) * calorias;
        let grasaKcal = (grasaPct / 100) * calorias;

        let proteinaGr = proteinaKcal / 4;
        let carboGr = carboKcal
        let grasaGr = grasaKcal / 9;

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



    let switchElement = $('#mySwitch'); 

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
        let cal = parseFloat(caloriasPlanificadasField.val()) || 0;
        let proteina = parseFloat(proteinaField.val()) || 0;
        let carbo = parseFloat(carbohidratoField.val()) || 0;
        let grasa = parseFloat(grasaField.val()) || 0;

       
        // Modal
        const modal = $(`
            <div id="modal-macronutrientes" class="modal-overlay">
                <div class="modal-body">
                    <div class="modal-content">
                    <span class="close">&times;</span>
                    <h4>Distribución por tiempo de comida</h4>
                    <div class="resumen-macros">
                        <div class="macro">
                            <span class="macro-value">${cal}</span>
                            <span class="macro-label">Kcal</span>
                        </div>
                        <div class="macro">
                            <span class="macro-value proteina">${proteina}%</span>
                            <span class="macro-label">Proteína</span>
                        </div>
                        <div class="macro">
                            <span class="macro-value carbohidrato">${carbo}%</span>
                            <span class="macro-label">Carbohidrato</span>
                        </div>
                        <div class="macro">
                            <span class="macro-value grasa">${grasa}%</span>
                            <span class="macro-label">Grasa</span>
                        </div>
                    </div>
                    <hr class="separador">

                    <div class="grid-comidas">
                        <div class="comida">
                            <label>Desayuno</label>
                            <div class="input-group">
                            <input type="number" id="desayuno" min="0" max="100">
                            <span class="unit">%</span>
                        </div>
                        <span id="desayunoKcal">0 kcal</span>      
                    </div>
                        <div class="comida">
                            <label>Media Mañana</label>
                            <div class="input-group">
                                <input type="number"  id="media_mañana"  min="0" max="100">
                                <span class="unit">%</span>
                            </div>
                              <span id="mediaMañanaKcal">0 kcal</span>
                        </div>
                        
                        <div class="comida">
                            <label>Almuerzo</label>
                            <div class="input-group">
                                <input type="number"  id="almuerzo" min="0" max="100">
                                <span class="unit">%</span>
                            </div>
                            <span id="almuerzoKcal">0 kcal</span>
                        </div>
                        
                        <div class="comida">
                            <label>Media Tarde</label>
                            <div class="input-group">
                                <input type="number"  id="media_tarde" min="0" max="100">
                                <span class="unit">%</span>
                            </div>
                            <span id="mediaTardeKcal">0 kcal</span>
                        </div>
                        
                        <div class="comida">
                            <label>Cena</label>
                            <div class="input-group">
                                <input type="number"  id="cena" min="0" max="100">
                                <span class="unit">%</span>
                            </div>
                            <span id="cenaKcal">0 kcal</span>
                        </div>
                    </div>
                    <button id="confirmar">Confirmar</button>
                </div>
                </div>
            </div>
        `);
      
        $('body').append(modal);

        // Función para calcular y actualizar las calorías dinámicamente
        function actualizarCalorias() {
            let desayuno = parseFloat($('#desayuno').val()) || 0;
            let m_mañana = parseFloat($('#media_mañana').val()) || 0;
            let almuerzo = parseFloat($('#almuerzo').val()) || 0;
            let m_tarde = parseFloat($('#media_tarde').val()) || 0;
            let cena = parseFloat($('#cena').val()) || 0;

            $('#desayunoKcal').text(((desayuno / 100) * cal).toFixed(2) + ' kcal');
            $('#mediaMañanaKcal').text(((m_mañana / 100) * cal).toFixed(2) + ' kcal');
            $('#almuerzoKcal').text(((almuerzo / 100) * cal).toFixed(2) + ' kcal');
            $('#mediaTardeKcal').text(((m_tarde / 100) * cal).toFixed(2) + ' kcal');
            $('#cenaKcal').text(((cena / 100) * cal).toFixed(2) + ' kcal');
        }

        // Escuchar cambios en los inputs y actualizar calorías
        $('.input-group input').on('input', actualizarCalorias);

        $('.close').on('click', function () {
            $('#modal-macronutrientes').remove();
            $('#mySwitch').prop('checked', false);
        });

        $('#cerrar-modal').on('click', function () {
            $('#modal-macronutrientes').remove();
        });

    }

        // Función para capturar valores 
    function insertarTablaMacronutrientes() {
        let cal = parseFloat($('#id_calorias_a_planificar').val()) || 0;
        let proteina = parseFloat(proteinaField.val()) || 0;
        let carbo = parseFloat(carbohidratoField.val()) || 0;
        let grasa = parseFloat(grasaField.val()) || 0;
        let tablaHTML = `
            <table class="tabla-macronutrientes_comida">
                <tbody>
        `;

        let comidas = [
            { id: "desayuno", nombre: "Desayuno" },
            { id: "media_mañana", nombre: "Media Mañana" },
            { id: "almuerzo", nombre: "Almuerzo" },
            { id: "media_tarde", nombre: "Media Tarde" },
            { id: "cena", nombre: "Cena" }
        ];

        // Recorrer cada comida y añadirla a la tabla
        comidas.forEach(comida => {
            let porcentaje = parseFloat($(`#${comida.id}`).val()) || 0;
            let calorias = ((porcentaje / 100) * cal).toFixed(2);
            let prot = Math.round(calorias * (proteina / 100) / 4);
            let car = Math.round(calorias * (carbo/100) / 4); 
            let gra = Math.round(calorias * (grasa/100) / 9); 

            tablaHTML += `
                <tr>
                    <td>
                        <strong>${comida.nombre}</strong>
                    </td>
                    <td>
                        <strong>${calorias} kcal</strong>
                        <div class="macronutrientes">
                            <span class="proteinas">🔴${prot}g</span>
                            <span class="carbohidratos">🟡${car}g</span>
                            <span class="grasas">🟢${gra}g</span>
                        </div>
                    </td>
                    <td>
                        <strong>${porcentaje}%</strong>
                    </td>
                </tr>
            `;
        });
        tablaHTML += `</tbody></table>`;
        $('#tabla-macronutrientes_por_comida').html(tablaHTML);
        $('#modal-macronutrientes').remove();
    }

    $(document).on('click', '#confirmar', insertarTablaMacronutrientes);


    let comidaSeleccionada = '';
    let preparaciones = {};

    // Generar tabla
    function generarTablaPreparaciones() {
        const comidas = ['Desayuno', 'Media mañana', 'Almuerzo', 'Media tarde', 'Cena'];
        let tablaPreparaciones = $('#tabla_preparaciones');

        let tablaHTML = `
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Comida</th>
                        <th>Preparaciones</th>
                    </tr>
                </thead>
                <tbody>
        `;

        comidas.forEach(comida => {
            tablaHTML += `
                <tr>
                    <td>${comida}</td>
                    <td>
                        <a href="#" class="editar-preparacion" data-comida="${comida}">
                            <i class="fas fa-pencil-alt"></i>
                        </a>
                    </td>
                </tr>
            `;
        });

        tablaHTML += `</tbody></table>`;
        tablaPreparaciones.html(tablaHTML);
    }
    generarTablaPreparaciones();

    // Evento para abrir el modal
    $(document).on('click', '.editar-preparacion', function (event) {
        event.preventDefault();
        comidaSeleccionada = $(this).data('comida');
        mostrarModalAlimentos(comidaSeleccionada);
    });

    

    // Mostrar modal
    function mostrarModalAlimentos() {
        $('#modal-alimentos').remove();

        const modal = $(`
            <div id="modal-alimentos" class="modal-overlay">
                <div class="modal-body">
                    <div class="modal-content">
                        <span class="close">&times;</span>
                        <h4 id="titulo-modal">${comidaSeleccionada}</h4>
                        <div class="p-5" id="listaSeleccionada">
                            <p class="mensaje-vacio">En está sección se mostrarán los alimentos que agregues en esta comida</p>
                        </div>
                        <input type="text" id="buscarAlimento" placeholder="Buscar alimento..." />
                        <div class="tabla-alimentos">
                            <div class="tabla-alimentos-wrapper">
                            <table id="tablaAlimentos">
                                <thead>
                                    <tr>
                                        <th>Cantidad</th>
                                        <th>Alimento</th>
                                        <th>Kcal</th>
                                        <th>G</th>
                                        <th>C</th>
                                        <th>P</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="listaAlimentos"></tbody>
                            </table>
                            </div>
                        </div>
                        <button id="cerrar">Cerrar</button>
                    </div>
                </div>
            </div>
        `);

        $('body').append(modal);

        cargarAlimentosSeleccionados();

        $('.close').on("click", function () {
            $('#modal-alimentos').fadeOut(function () {
                $(this).remove();
            });
        });

        $('#cerrar').on('click', function () {
            guardarAlimentosSeleccionados();
            actualizarCeldaConAlimentos();
            $('#modal-alimentos').fadeOut(function () {
                $(this).remove();
            });
        });

        // Alimentos simulados
        const alimentos = [
            { cantidad: 100, unidad: "gramos", nombre: "Leche dorada", kcal: 44.81, grasa: "1.24 g", carbo: "8.38 g", proteina: "0.62 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de vaca", kcal: 63, grasa: "3.5 g", carbo: "4.9 g", proteina: "3.1 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" },
            { cantidad: 100, unidad: "gramos", nombre: "Leche de coco", kcal: 230, grasa: "23.84 g", carbo: "5.54 g", proteina: "2.29 g" }
        ];

        alimentos.forEach(alimento => {
            const fila = $(`
                <tr>
                    <td>${alimento.cantidad}</td>
                    <td>${alimento.nombre}</td>
                    <td>${alimento.kcal}</td>
                    <td>${alimento.grasa}</td>
                    <td>${alimento.carbo}</td>
                    <td>${alimento.proteina}</td>
                    <td><button class="agregar-alimento" data-nombre="${alimento.nombre}" data-cantidad="${alimento.cantidad}">+</button></td>
                </tr>
            `);
            $('#listaAlimentos').append(fila);
        });

        $(document).off('click', '.agregar-alimento').on('click', '.agregar-alimento', function () {
            const nombre = $(this).data('nombre');
            const cantidad = $(this).data('cantidad');

            if ($("#listaSeleccionada").find(`[data-nombre='${nombre}']`).length > 0) {
                alert("Este alimento ya está agregado.");
                return;
            }

            $("#listaSeleccionada .mensaje-vacio").remove();

            $('#listaSeleccionada').append(`
                <div class="alimento-seleccionado" data-nombre="${nombre}">
                    <span>${cantidad}</span>
                    <span>gramos</span>
                    <span>${nombre}</span>
                    <i class="eliminar-alimento fa-solid fa-trash" data-nombre="${nombre}"></i>
                </div>
            `);
        });

        $(document).off('click', '.eliminar-alimento').on('click', '.eliminar-alimento', function () {
            const nombre = $(this).data('nombre');
            $(`#listaSeleccionada .alimento-seleccionado[data-nombre='${nombre}']`).remove();

            if ($("#listaSeleccionada .alimento-seleccionado").length === 0) {
                $('#listaSeleccionada').append('<p class="mensaje-vacio">Aquí aparecerán los alimentos que agregues en esta comida</p>');
            }
        });
    }
        // Función para guardar los alimentos seleccionados en un objeto
    function guardarAlimentosSeleccionados() {
        if (!comidaSeleccionada) return;

        let alimentos = [];
        $("#listaSeleccionada .alimento-seleccionado").each(function () {
            let nombre = $(this).find('span:nth-child(3)').text();
            let cantidad = $(this).find('span:nth-child(1)').text();
            alimentos.push({ nombre, cantidad });
        });

        preparaciones[comidaSeleccionada] = alimentos;
    }

    // Función para cargar los alimentos guardados al abrir el modal
    function cargarAlimentosSeleccionados() {
        $("#listaSeleccionada").empty();

        if (preparaciones[comidaSeleccionada] && preparaciones[comidaSeleccionada].length > 0) {
            preparaciones[comidaSeleccionada].forEach(alimento => {
                $('#listaSeleccionada').append(`
                    <div class="alimento-seleccionado" data-nombre="${alimento.nombre}">
                        <span>${alimento.cantidad}</span>
                        <span>${alimento.nombre}</span>
                        <i class="eliminar-alimento fa-solid fa-trash" data-nombre="${alimento.nombre}"></i>
                    </div>
                `);
            });
        } else {
            $('#listaSeleccionada').append('<p class="mensaje-vacio">Aquí aparecerán los alimentos que agregues en esta comida</p>');
        }
    }

    // Actualizar la celda con los alimentos seleccionados
    function actualizarCeldaConAlimentos() {
        if (!comidaSeleccionada) return;

        let seleccionados = $("#listaSeleccionada .alimento-seleccionado");
        let celda = $(`a[data-comida='${comidaSeleccionada}']`).closest('td');

        if (seleccionados.length > 0) {
            let contenido = '';
            seleccionados.each(function () {
                let nombre = $(this).find('span:nth-child(2)').text();
                let cantidad = $(this).find('span:nth-child(1)').text();
                contenido += `<div class="alimento-item">${cantidad} ${nombre}</div>`;
            });

            celda.html(`${contenido} <a href="#" class="editar-preparacion" data-comida="${comidaSeleccionada}"><i class="fas fa-pencil-alt"></i></a>`);
        }
    }
});
