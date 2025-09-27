<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT tipo, tarifa_hora, tarifa_dia FROM tarifas";
    $result = $conn->query($sql);
    $tarifas = [];
    while($row = $result->fetch_assoc()) {
        $tarifas[] = $row;
    }
    echo json_encode(['success' => true, 'tarifas' => $tarifas]);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $tipo = $conn->real_escape_string($data->tipo);
    $tarifa_hora = $conn->real_escape_string($data->tarifa_hora);
    $tarifa_dia = $conn->real_escape_string($data->tarifa_dia);

    $check_sql = "SELECT id FROM tarifas WHERE tipo = '$tipo'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        $update_sql = "UPDATE tarifas SET tarifa_hora = '$tarifa_hora', tarifa_dia = '$tarifa_dia' WHERE tipo = '$tipo'";
        if ($conn->query($update_sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Tarifa actualizada exitosamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
        }
    } else {
        $insert_sql = "INSERT INTO tarifas (tipo, tarifa_hora, tarifa_dia) VALUES ('$tipo', '$tarifa_hora', '$tarifa_dia')";
        if ($conn->query($insert_sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Tarifa añadida exitosamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    $tipo = $conn->real_escape_string($data->tipo);
    $sql = "DELETE FROM tarifas WHERE tipo = '$tipo'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Tarifa eliminada exitosamente.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método no permitido.']);
}

$conn->close();
?>