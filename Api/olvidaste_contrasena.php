<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $username = $conn->real_escape_string($data->username);
    $new_password = $conn->real_escape_string($data->new_password);

    $check_sql = "SELECT id FROM usuarios WHERE username = '$username'";
    $check_result = $conn->query($check_sql);

    if ($check_result->num_rows > 0) {
        $update_sql = "UPDATE usuarios SET password = '$new_password' WHERE username = '$username'";
        if ($conn->query($update_sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Contraseña restablecida exitosamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al restablecer: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Usuario no encontrado.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}
$conn->close();
?>