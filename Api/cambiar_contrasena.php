<?php
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    $username = $conn->real_escape_string($data->username);
    $current_password = $conn->real_escape_string($data->current_password);
    $new_password = $conn->real_escape_string($data->new_password);

    // Verificar contraseña actual
    $sql = "SELECT id FROM usuarios WHERE username = '$username' AND password = '$current_password'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $update_sql = "UPDATE usuarios SET password = '$new_password' WHERE username = '$username'";
        if ($conn->query($update_sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => 'Contraseña cambiada exitosamente.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al actualizar: ' . $conn->error]);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'La contraseña actual es incorrecta.']);
    }

} else {
    echo json_encode(['success' => false, 'message' => 'Método de solicitud no permitido.']);
}
$conn->close();
?>