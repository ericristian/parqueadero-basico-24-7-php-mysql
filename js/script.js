document.addEventListener('DOMContentLoaded', () => {

    const API_URL = 'http://localhost/proyecto_parqueadero_24-7/api/';

    // --- Lógica para la Pantalla de Login ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            try {
                const response = await fetch(`${API_URL}login.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                
                if (data.success) {
                    alert(data.message);
                    sessionStorage.setItem('loggedInUser', username); // Usamos sessionStorage para esta sesión
                    window.location.href = 'dashboard.html';
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al conectar con el servidor.');
            }
        });
    }

    // --- Lógica para la Pantalla de Registro de Nuevo Usuario ---
    const registroForm = document.getElementById('registro-form');
    if (registroForm) {
        registroForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const username = document.getElementById('reg-username').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('confirm-reg-password').value;
            
            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            try {
                const response = await fetch(`${API_URL}registro.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();

                alert(data.message);
                if (data.success) {
                    window.location.href = 'index.html';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al registrar el usuario.');
            }
        });
    }

    // --- Lógica para la Pantalla de Restablecer Contraseña ---
    const olvidasteForm = document.getElementById('olvidaste-form');
    if (olvidasteForm) {
        olvidasteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            
            const username = document.getElementById('recuperar-username').value;
            const newPassword = document.getElementById('nueva-contrasena').value;
            const confirmNewPassword = document.getElementById('confirmar-nueva-contrasena').value;
            
            if (newPassword !== confirmNewPassword) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            try {
                const response = await fetch(`${API_URL}olvidaste_contrasena.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, new_password: newPassword })
                });
                const data = await response.json();

                alert(data.message);
                if (data.success) {
                    window.location.href = 'index.html';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al restablecer la contraseña.');
            }
        });
    }

    // --- Lógica para la Pantalla de Cambio de Contraseña ---
    const cambiarContrasenaForm = document.getElementById('cambiar-contrasena-form');
    if (cambiarContrasenaForm) {
        cambiarContrasenaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            const loggedInUser = sessionStorage.getItem('loggedInUser');
            
            if (!loggedInUser) {
                alert('No se encontró el usuario. Por favor, inicia sesión de nuevo.');
                window.location.href = 'index.html';
                return;
            }
            
            if (newPassword !== confirmNewPassword) {
                alert('La nueva contraseña y la confirmación no coinciden.');
                return;
            }
            
            try {
                const response = await fetch(`${API_URL}cambiar_contrasena.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        username: loggedInUser,
                        current_password: currentPassword,
                        new_password: newPassword
                    })
                });
                const data = await response.json();
                
                alert(data.message);
                if (data.success) {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al cambiar la contraseña.');
            }
        });
    }
    
    // --- Lógica para la Pantalla de Registro de Entrada ---
    const entradaForm = document.getElementById('entrada-form');
    if (entradaForm) {
        entradaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const placa = document.getElementById('placa_entrada').value.trim().toUpperCase();
            const tipo = document.getElementById('tipo_vehiculo_entrada').value;
            const fecha_entrada = document.getElementById('fecha_entrada').value;
            const hora_entrada = document.getElementById('hora_entrada').value;
            
            try {
                const response = await fetch(`${API_URL}registro_entrada.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ placa, tipo, fecha_entrada, hora_entrada })
                });
                const data = await response.json();
                
                alert(data.message);
                if (data.success) {
                    entradaForm.reset();
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al registrar la entrada.');
            }
        });
    }

    // --- Lógica para la Pantalla de Registro de Salida ---
    const salidaForm = document.getElementById('salida-form');
    if (salidaForm) {
        const buscarBtn = document.getElementById('buscar-vehiculo-btn');
        const detallesDiv = document.getElementById('detalles-entrada');
        const tarifaSpan = document.getElementById('tarifa_a_pagar');
        const registrarSalidaBtn = document.getElementById('registrar-salida-btn');
        const placaInput = document.getElementById('placa_salida');

        buscarBtn.addEventListener('click', async () => {
            const placa = placaInput.value.trim().toUpperCase();
            if (!placa) {
                alert('Por favor, ingresa una placa.');
                return;
            }

            try {
                const vehiculoResponse = await fetch(`${API_URL}get_vehiculo.php?placa=${placa}`);
                const vehiculoData = await vehiculoResponse.json();

                if (vehiculoData.success) {
                    const vehiculoEncontrado = vehiculoData.vehiculo;
                    const tarifasResponse = await fetch(`${API_URL}gestion_tarifas.php`);
                    const tarifasData = await tarifasResponse.json();
                    
                    if (tarifasData.success) {
                        const tarifas = tarifasData.tarifas;
                        const now = new Date();
                        const fechaHoraEntrada = new Date(vehiculoEncontrado.fecha_entrada);
                        const diffMs = now.getTime() - fechaHoraEntrada.getTime();
                        const diffHours = diffMs / (1000 * 60 * 60);

                        const tarifaVehiculo = tarifas.find(t => t.tipo === vehiculoEncontrado.tipo);
                        const costoTotal = Math.ceil(diffHours) * tarifaVehiculo.tarifa_hora;
                        
                        document.getElementById('detalle_placa').textContent = vehiculoEncontrado.placa;
                        document.getElementById('detalle_tipo').textContent = vehiculoEncontrado.tipo;
                        document.getElementById('detalle_fecha_entrada').textContent = new Date(vehiculoEncontrado.fecha_entrada).toLocaleDateString();
                        document.getElementById('detalle_hora_entrada').textContent = new Date(vehiculoEncontrado.fecha_entrada).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
                        document.getElementById('detalle_hora_salida').textContent = now.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' });
                        tarifaSpan.textContent = `$${costoTotal.toLocaleString('es-CO')}`;

                        detallesDiv.style.display = 'block';
                        document.getElementById('metodo-pago-group').style.display = 'block';
                        registrarSalidaBtn.style.display = 'block';
                        registrarSalidaBtn.dataset.costo = costoTotal;

                    } else {
                        alert('No se pudo cargar las tarifas.');
                    }
                } else {
                    alert(vehiculoData.message);
                    detallesDiv.style.display = 'none';
                    document.getElementById('metodo-pago-group').style.display = 'none';
                    registrarSalidaBtn.style.display = 'none';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al buscar el vehículo.');
            }
        });

        salidaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const placa = placaInput.value.trim().toUpperCase();
            const costoTotal = registrarSalidaBtn.dataset.costo;

            try {
                const response = await fetch(`${API_URL}registro_salida.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ placa, costo_total: costoTotal })
                });
                const data = await response.json();
                
                alert(data.message);
                if (data.success) {
                    salidaForm.reset();
                    detallesDiv.style.display = 'none';
                    registrarSalidaBtn.style.display = 'none';
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al registrar la salida.');
            }
        });
    }
    
    // --- Lógica para la Pantalla de Reportes ---
    const reporteForm = document.getElementById('reporte-form');
    if (reporteForm) {
        const reporteResultadoDiv = document.getElementById('reporte-resultado');

        reporteForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const tipoReporte = document.getElementById('tipo_reporte').value;
            
            try {
                const response = await fetch(`${API_URL}reportes.php?tipo=${tipoReporte}`);
                const data = await response.json();
                
                let resultadoHtml = `<h2>Resultado del Reporte</h2>`;

                if (data.success) {
                    if (tipoReporte === 'ingresos_diarios') {
                        const totalIngresos = parseFloat(data.data.total_ingresos);
                        resultadoHtml += `
                            <h3>Ingresos Diarios</h3>
                            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
                            <p><strong>Total Ingresos:</strong> $${totalIngresos.toLocaleString('es-CO')}</p>
                        `;
                    } else if (tipoReporte === 'vehiculos_entrados_salidos') {
                        resultadoHtml += `
                            <h3>Movimiento de Vehículos (Histórico)</h3>
                            <p><strong>Total de Entradas:</strong> ${data.data.entradas}</p>
                            <p><strong>Total de Salidas:</strong> ${data.data.salidas}</p>
                        `;
                    } else if (tipoReporte === 'ocupacion_actual') {
                        resultadoHtml += `
                            <h3>Ocupación Actual</h3>
                            <p><strong>Vehículos Activos:</strong> ${data.data.ocupacion_actual}</p>
                            <p><strong>Capacidad Total:</strong> (No definida)</p>
                        `;
                    }
                } else {
                    resultadoHtml += `<p>${data.message}</p>`;
                }

                reporteResultadoDiv.innerHTML = resultadoHtml;
                reporteResultadoDiv.style.display = 'block';

            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al generar el reporte.');
            }
        });
    }
    
    // --- Lógica para la Pantalla de Gestión de Tarifas ---
    const tarifaForm = document.getElementById('tarifa-form');
    if (tarifaForm) {
        const cargarTarifas = async () => {
            const tbody = document.querySelector('#tarifa-form + h2 + .table-responsive table tbody');
            try {
                const response = await fetch(`${API_URL}gestion_tarifas.php`);
                const data = await response.json();
                
                tbody.innerHTML = '';
                if (data.success && data.tarifas.length > 0) {
                    data.tarifas.forEach(tarifa => {
                        const row = `
                            <tr>
                                <td>${tarifa.tipo}</td>
                                <td>$${parseFloat(tarifa.tarifa_hora).toLocaleString('es-CO')}</td>
                                <td>$${parseFloat(tarifa.tarifa_dia).toLocaleString('es-CO')}</td>
                                <td>
                                    <button class="btn small-btn delete-btn" data-tipo="${tarifa.tipo}">Eliminar</button>
                                </td>
                            </tr>
                        `;
                        tbody.innerHTML += row;
                    });
                } else {
                    tbody.innerHTML = '<tr><td colspan="4">No hay tarifas registradas.</td></tr>';
                }
            } catch (error) {
                console.error('Error:', error);
                tbody.innerHTML = '<tr><td colspan="4">Error al cargar las tarifas.</td></tr>';
            }
        };

        cargarTarifas();

        tarifaForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const tipoVehiculo = document.getElementById('tipo_vehiculo_tarifa').value;
            const tarifaHora = parseFloat(document.getElementById('tarifa_hora').value);
            const tarifaDia = parseFloat(document.getElementById('tarifa_dia').value);

            if (!tipoVehiculo || isNaN(tarifaHora) || isNaN(tarifaDia)) {
                alert('Por favor, completa todos los campos de tarifa.');
                return;
            }

            try {
                const response = await fetch(`${API_URL}gestion_tarifas.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ tipo: tipoVehiculo, tarifa_hora: tarifaHora, tarifa_dia: tarifaDia })
                });
                const data = await response.json();

                alert(data.message);
                if (data.success) {
                    tarifaForm.reset();
                    cargarTarifas();
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Hubo un problema al guardar la tarifa.');
            }
        });

        document.querySelector('.table-responsive table tbody').addEventListener('click', async (event) => {
            if (event.target.classList.contains('delete-btn')) {
                const tipo = event.target.dataset.tipo;
                if (confirm(`¿Estás seguro de que quieres eliminar la tarifa para el tipo "${tipo}"?`)) {
                    try {
                        const response = await fetch(`${API_URL}gestion_tarifas.php`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ tipo })
                        });
                        const data = await response.json();
                        alert(data.message);
                        if (data.success) {
                            cargarTarifas();
                        }
                    } catch (error) {
                        console.error('Error:', error);
                        alert('Hubo un problema al eliminar la tarifa.');
                    }
                }
            }
        });
    }

    // --- Lógica para la Pantalla de Consultar Vehículos ---
    const consultarVehiculosPage = document.querySelector('.vehicle-list');
    if (consultarVehiculosPage) {
        const renderizarVehiculos = async (placa = '') => {
            const lista = document.querySelector('.vehicle-list');
            lista.innerHTML = `<div class="list-header"><span>Placa</span><span>Tipo</span><span>Entrada</span><span>Estado</span></div>`;
            
            try {
                const response = await fetch(`${API_URL}get_vehiculos_activos.php?placa=${placa}`);
                const data = await response.json();
                
                if (data.success && data.vehiculos.length > 0) {
                    data.vehiculos.forEach(v => {
                        const item = document.createElement('div');
                        item.className = 'vehicle-item';
                        item.innerHTML = `
                            <span>${v.placa}</span>
                            <span>${v.tipo}</span>
                            <span>${new Date(v.fecha_entrada).toLocaleString()}</span>
                            <span>${v.estado === 'activo' ? 'Activo' : 'Salido'}</span>
                        `;
                        lista.appendChild(item);
                    });
                } else {
                    lista.innerHTML += `<div class="vehicle-item"><span>No se encontraron vehículos activos.</span></div>`;
                }
            } catch (error) {
                console.error('Error:', error);
                lista.innerHTML += `<div class="vehicle-item"><span>Error al cargar vehículos.</span></div>`;
            }
        };

        const buscarInput = document.getElementById('buscar_placa_consulta');
        buscarInput.addEventListener('input', (event) => {
            renderizarVehiculos(event.target.value);
        });

        renderizarVehiculos();
    }
});