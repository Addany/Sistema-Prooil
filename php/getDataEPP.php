<?php
header('Content-Type: application/json');
include 'conexion_bd.php';
$id = null;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
}else{
    echo json_encode(['error' => 'Método no permitido']);
    exit;
}
try {
    $stmt = $conexion->prepare("SELECT epp.id_epp,epp.nombre_epp, epp_tipo.*, cantidad_epp.* FROM epp
                                JOIN epp_tipo ON epp.id_epp = epp_tipo.id_epp
                                JOIN cantidad_epp ON epp_tipo.identificador = cantidad_epp.identificador
                                WHERE epp.id_epp = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    if (!$stmt->execute()) {
        echo json_encode(['error' => 'Error en la ejecución de la consulta: ' . $stmt->error]);
        exit;
    }
    $result = $stmt->get_result();

    if ($result && $result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(['error' => 'No existe herramienta']);
    }
    $stmt->close();
    $conexion->close();
} catch (Exception $e) {
    echo json_encode(['error' => 'Error en el servidor: ' . $e->getMessage()]);
}
?>