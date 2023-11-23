<?php
include 'conexion_bd.php';
if ($conexion->connect_error) {
    die('Error de Conexión (' . $conexion->connect_errno . ') '
            . $conexion->connect_error);
}
try {
	$request_body = file_get_contents('php://input');
	$data = json_decode($request_body, true);
	$no_folio = $data['no_folio'];
	$sql = "
	    SELECT historial_epp.*, cantidad_epp.*, folio_epp.*, epp.nombre_epp,
	    CASE
	    	WHEN historial_epp.id_trabajador IS NOT NULL THEN empleado.nombre
	    	WHEN historial_epp.id_invitado IS NOT NULL THEN invitado.nombre
	    END AS nombre_persona
	    FROM historial_epp
	    JOIN folio_epp ON historial_epp.no_folio = folio_epp.no_folio
	    JOIN cantidad_epp ON historial_epp.identificador = cantidad_epp.identificador
	    LEFT JOIN invitado ON historial_epp.id_invitado = invitado.id_invitado
	    LEFT JOIN empleado ON historial_epp.id_trabajador = empleado.id_trabajador
	    JOIN epp_tipo on epp_tipo.identificador = cantidad_epp.identificador
	    JOIN epp on epp.id_epp = epp_tipo.id_epp
	    WHERE
	        historial_epp.no_folio = ?
	";
	$stmt = $conexion->prepare($sql);
    if(!$stmt){
        throw new Exception("Error en la preparación de la consulta: " . $conexion->error);
    }
    $stmt->bind_param('i', $no_folio);
	$stmt->execute();
	$result = $stmt->get_result();
	if ($result->num_rows > 0) {
	    // Convertir los resultados en un array asociativo
	    $output = $result->fetch_all(MYSQLI_ASSOC);
	} else {
	    $output = array();
	}
	$stmt->close();
	$conexion->close();	
	header('Content-Type: application/json');
	echo json_encode($output);
} catch (Exception $e) {
    $error_array = array('error' => true, 'message' => $e->getMessage());
    header('Content-Type: application/json');
    echo json_encode($error_array);
    exit;
}
?>