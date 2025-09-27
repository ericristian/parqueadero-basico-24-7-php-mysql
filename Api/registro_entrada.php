<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $placa = $conn->real_escape_string($data->placa);
    $tipo = $conn->real_escape_string($data->tipo);
    $fecha_entrada = $conn->real_escape_string($data->fecha_entrada);
    $hora_entrada = $conn->real_escape_string($data->hora_entrada);

    $sql = "INSERT INTO vehiculos (placa, tipo, fecha_entrada, estado) VALUES ('$placa', '$tipo', '$fecha_entrada $hora_entrada', 'activo')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Entrada registrada exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}
$conn->close();
?>