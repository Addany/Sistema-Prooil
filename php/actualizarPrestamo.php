<?php
include 'conexion_bd.php';
header('Content-Type: application/json');
if ($conexion->connect_error) {
    echo json_encode(['error' => true, 'message' => 'Error de Conexión: ' . $conexion->connect_error]);
    exit;
}

$ids = isset($_POST['ids']) ? json_decode($_POST['ids']) : [];

if (!is_array($ids)) {
    echo json_encode(['error' => true, 'message' => 'IDs deben ser un array.']);
    exit;
}
$conexion->autocommit(FALSE);
try {
    $updateHistorial = $conexion->prepare("UPDATE historial_herramienta SET fecha_devolucion = NOW() WHERE identificador = ? AND fecha_devolucion IS NULL");
    $updateCantidad = $conexion->prepare("UPDATE herramientas_cantidad SET disponibilidad = 'Disponible' WHERE identificador = ?");
    foreach ($ids as $id) {
        $updateHistorial->bind_param("i", $id);
        if (!$updateHistorial->execute()) {
            throw new Exception("Error al actualizar historial: " . $updateHistorial->error);
        }
        $updateCantidad->bind_param("i", $id);
        if (!$updateCantidad->execute()) {
            throw new Exception("Error al actualizar disponibilidad: " . $updateCantidad->error);
        }
    }
    if (!$conexion->commit()) {
        throw new Exception("Error al realizar commit: " . $conexion->error);
    }
    echo json_encode(['error' => false, 'message' => 'Actualización exitosa.']);
} catch (Exception $e) {
    $conexion->rollback();
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
    header('Content-Type: application/json');
} finally{
    $updateHistorial->close();
    $updateCantidad->close();
    $conexion->close();
}
?>