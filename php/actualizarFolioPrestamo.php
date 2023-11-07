<?php
include 'conexion_bd.php';
header('Content-Type: application/json');

try {
    // Verificar si el folio ha sido enviado en la petición POST
    $folio = isset($_POST['folio']) ? $_POST['folio'] : null;

    if ($folio) {
        // Preparar la consulta SQL para actualizar el registro correspondiente al folio
        $sql = "UPDATE folio_prestamo SET estado = 'Concretado', fecha_devolucion = NOW() WHERE no_folio = ?";
        $stmt = $conexion->prepare($sql);
        if (!$stmt) {
            throw new Exception("Error al preparar la consulta: " . $conexion->error);
        }

        $stmt->bind_param('i', $folio);
        if (!$stmt->execute()) {
            throw new Exception("Error al ejecutar la consulta: " . $stmt->error);
        }
        $stmt->close();
        echo json_encode(['success' => true, 'message' => 'Folio actualizado con éxito.']);
    } else {
        echo json_encode(['error' => true, 'message' => 'No se proporcionó ningún folio para actualizar.']);
    }
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
} finally {
	$conexion->close();
}
?>