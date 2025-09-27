<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['tipo'])) {
    $tipo_reporte = $_GET['tipo'];
    $response = ['success' => false, 'message' => 'Tipo de reporte inválido.'];

    if ($tipo_reporte === 'ingresos_diarios') {
        $hoy = date('Y-m-d');
        $sql = "SELECT SUM(costo_total) AS total_ingresos FROM vehiculos WHERE DATE(fecha_salida) = '$hoy' AND estado = 'salido'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $total_ingresos = $row['total_ingresos'] ?? 0;
        $response = ['success' => true, 'data' => ['total_ingresos' => $total_ingresos]];
    } elseif ($tipo_reporte === 'ocupacion_actual') {
        $sql = "SELECT COUNT(*) AS ocupacion FROM vehiculos WHERE estado = 'activo'";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
        $ocupacion = $row['ocupacion'] ?? 0;
        $response = ['success' => true, 'data' => ['ocupacion_actual' => $ocupacion]];
    } elseif ($tipo_reporte === 'vehiculos_entrados_salidos') {
        $sql_entradas = "SELECT COUNT(*) AS total FROM vehiculos";
        $result_entradas = $conn->query($sql_entradas);
        $total_entradas = $result_entradas->fetch_assoc()['total'] ?? 0;

        $sql_salidas = "SELECT COUNT(*) AS total FROM vehiculos WHERE estado = 'salido'";
        $result_salidas = $conn->query($sql_salidas);
        $total_salidas = $result_salidas->fetch_assoc()['total'] ?? 0;
        
        $response = ['success' => true, 'data' => ['entradas' => $total_entradas, 'salidas' => $total_salidas]];
    }
    
    echo json_encode($response);
} else {
    echo json_encode(['success' => false, 'message' => 'Solicitud inválida.']);
}

$conn->close();
?>