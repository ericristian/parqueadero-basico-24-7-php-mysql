<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $placa = $conn->real_escape_string($data->placa);
    $costo_total = $conn->real_escape_string($data->costo_total);
    $fecha_salida = date('Y-m-d H:i:s');

    $sql = "UPDATE vehiculos SET fecha_salida = '$fecha_salida', costo_total = '$costo_total', estado = 'salido' WHERE placa = '$placa' AND estado = 'activo'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Salida registrada exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}
$conn->close();
?>