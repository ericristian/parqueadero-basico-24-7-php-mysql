document.addEventListener('DOMContentLoaded', () => {
    // Lógica para la Pantalla de Login
    const loginForm = document.getElementById ('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que el formulario se envíe realmente
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Simulación de autenticación (¡En un proyecto real, esto iría al backend!)
            if (username === 'admin' && password === 'admin123') {
                alert('¡Inicio de sesión exitoso!');
                window.location.href = 'dashboard.html'; // Redirige al panel principal
            } else {
                alert('Usuario o contraseña incorrectos. Intenta de nuevo.');
            }
        });
    }

    // Lógica para la Pantalla de Registro de Entrada
    const entradaForm = document.getElementById('entrada-form');
    if (entradaForm) {
        // Rellenar fecha y hora actual automáticamente
        const fechaEntradaInput = document.getElementById('fecha_entrada');
        const horaEntradaInput = document.getElementById('hora_entrada');
        const now = new Date();
        const dateString = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');
        const timeString = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');

        fechaEntradaInput.value = dateString;
        horaEntradaInput.value = timeString;

        entradaForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const placa = document.getElementById('placa_entrada').value;
            const tipo = document.getElementById('tipo_vehiculo_entrada').value;
            const fecha = fechaEntradaInput.value;
            const hora = horaEntradaInput.value;
            const idCliente = document.getElementById('id_cliente_entrada').value;

            alert(`Vehículo ${placa} (${tipo}) registrado a las ${hora} del ${fecha}. ID Cliente: ${idCliente || 'N/A'}`);
            // Aquí iría la lógica para enviar estos datos a una base de datos (backend)
            entradaForm.reset(); // Limpia el formulario
            fechaEntradaInput.value = dateString; // Vuelve a poner la fecha y hora actual
            horaEntradaInput.value = timeString;
        });
    }

    // Lógica para la Pantalla de Registro de Salida
    const salidaForm = document.getElementById('salida-form');
    if (salidaForm) {
        const buscarVehiculoBtn = document.getElementById('buscar-vehiculo-btn');
        const detallesEntradaDiv = document.getElementById('detalles-entrada');
        const metodoPagoGroup = document.getElementById('metodo-pago-group');
        const registrarSalidaBtn = document.getElementById('registrar-salida-btn');
        const placaSalidaInput = document.getElementById('placa_salida');

        buscarVehiculoBtn.addEventListener('click', () => {
            const placa = placaSalidaInput.value.trim();
            if (placa) {
                // Simulación de búsqueda de vehículo (¡en un proyecto real, esto sería una llamada API!)
                // Suponemos que encontramos un vehículo con estos datos
                const vehiculoEncontrado = {
                    placa: placa.toUpperCase(),
                    tipo: 'Carro', // O el tipo real
                    fecha_entrada: '2025-05-19',
                    hora_entrada: '10:00',
                };

                if (vehiculoEncontrado) {
                    const now = new Date();
                    const horaSalida = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
                    const fechaSalida = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0') + '-' + String(now.getDate()).padStart(2, '0');

                    document.getElementById('detalle_placa').textContent = vehiculoEncontrado.placa;
                    document.getElementById('detalle_tipo').textContent = vehiculoEncontrado.tipo;
                    document.getElementById('detalle_fecha_entrada').textContent = vehiculoEncontrado.fecha_entrada;
                    document.getElementById('detalle_hora_entrada').textContent = vehiculoEncontrado.hora_entrada;
                    document.getElementById('detalle_hora_salida').textContent = horaSalida;

                    // Simulación de cálculo de tarifa (¡en un proyecto real, esto sería más complejo!)
                    const tarifa = 5000; // Ejemplo de tarifa fija
                    document.getElementById('tarifa_a_pagar').textContent = `$${tarifa.toLocaleString('es-CO')}`;

                    detallesEntradaDiv.style.display = 'block';
                    metodoPagoGroup.style.display = 'block';
                    registrarSalidaBtn.style.display = 'block';
                } else {
                    alert('Vehículo no encontrado.');
                    detallesEntradaDiv.style.display = 'none';
                    metodoPagoGroup.style.display = 'none';
                    registrarSalidaBtn.style.display = 'none';
                }
            } else {
                alert('Por favor, ingresa la placa del vehículo.');
            }
        });

        salidaForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const placa = document.getElementById('placa_salida').value;
            const tarifaPagada = document.getElementById('tarifa_a_pagar').textContent;
            const metodoPago = document.getElementById('metodo_pago').value;

            alert(`Salida de ${placa} registrada. Tarifa pagada: ${tarifaPagada} con ${metodoPago}.`);
            // Aquí iría la lógica para actualizar el estado del vehículo en la base de datos
            salidaForm.reset();
            detallesEntradaDiv.style.display = 'none';
            metodoPagoGroup.style.display = 'none';
            registrarSalidaBtn.style.display = 'none';
        });
    }

    // Lógica para la Pantalla de Reportes (simulación)
    const reporteForm = document.getElementById('reporte-form');
    if (reporteForm) {
        const reporteResultadoDiv = document.getElementById('reporte-resultado');
        reporteForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const tipoReporte = document.getElementById('tipo_reporte').value;
            const fechaInicio = document.getElementById('fecha_inicio').value;
            const fechaFin = document.getElementById('fecha_fin').value;

            let resultadoHtml = ``;
            if (tipoReporte === 'ingresos_diarios') {
                resultadoHtml = `
                    <h3>Reporte de Ingresos Diarios</h3>
                    <p><strong>Fecha:</strong> ${fechaInicio || 'Hoy'}</p>
                    <p><strong>Total Ingresos:</strong> $150.000 (Simulado)</p>
                    <p><strong>Vehículos Registrados:</strong> 30 (Simulado)</p>
                `;
            } else if (tipoReporte === 'vehiculos_entrados_salidos') {
                resultadoHtml = `
                    <h3>Reporte de Movimiento de Vehículos</h3>
                    <p><strong>Periodo:</strong> ${fechaInicio || 'Inicio'} al ${fechaFin || 'Fin'}</p>
                    <p><strong>Entradas:</strong> 25 (Simulado)</p>
                    <p><strong>Salidas:</strong> 20 (Simulado)</p>
                `;
            } else if (tipoReporte === 'ocupacion_actual') {
                resultadoHtml = `
                    <h3>Reporte de Ocupación Actual</h3>
                    <p><strong>Vehículos Activos:</strong> 10 (Simulado)</p>
                    <p><strong>Capacidad Total:</strong> 50 (Simulado)</p>
                    <p><strong>Porcentaje Ocupación:</strong> 20% (Simulado)</p>
                `;
            }

            reporteResultadoDiv.innerHTML = resultadoHtml;
            reporteResultadoDiv.style.display = 'block';
        });
    }

    // Lógica para la Pantalla de Gestión de Tarifas (simulación)
    const tarifaForm = document.getElementById('tarifa-form');
    if (tarifaForm) {
        tarifaForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const tipoVehiculo = document.getElementById('tipo_vehiculo_tarifa').value;
            const tarifaHora = document.getElementById('tarifa_hora').value;
            const tarifaDia = document.getElementById('tarifa_dia').value;

            if (tipoVehiculo && tarifaHora && tarifaDia) {
                alert(`Tarifas actualizadas para ${tipoVehiculo}: Hora $${tarifaHora}, Día $${tarifaDia}. (Simulado)`);
                // Aquí iría la lógica para guardar en el backend y actualizar la tabla
            } else {
                alert('Por favor, completa todos los campos de tarifa.');
            }
        });
    }
});