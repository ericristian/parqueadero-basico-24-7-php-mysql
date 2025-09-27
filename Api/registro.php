<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $username = $conn->real_escape_string($data->username);
    $password = $conn->real_escape_string($data->password);

    $check_sql = "SELECT id FROM usuarios WHERE username = '$username'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'Ese nombre de usuario ya existe.']);
    } else {
        $insert_sql = "INSERT INTO usuarios (username, password) VALUES ('$username', '$password')";
        if ($conn->query($insert_sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => '¡Registro exitoso!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al registrar: ' . $conn->error]);
        }
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}

$conn->close();
?>