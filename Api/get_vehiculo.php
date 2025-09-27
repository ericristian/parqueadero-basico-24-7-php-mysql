<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['placa'])) {
    $placa = $conn->real_escape_string($_GET['placa']);
    $sql = "SELECT placa, tipo, fecha_entrada FROM vehiculos WHERE placa = '$placa' AND estado = 'activo'";
    $result = $conn->query($sql);
    
    if ($result->num_rows > 0) {
        $vehiculo = $result->fetch_assoc();
        echo json_encode(['success' => true, 'vehiculo' => $vehiculo]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Vehículo no encontrado.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Solicitud inválida.']);
}
$conn->close();
?>