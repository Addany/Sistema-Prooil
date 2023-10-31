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
	    SELECT
	        historial_herramienta.*,
	        historial_herramienta.fecha_devolucion as devolucion,
	        folio_prestamo.fecha_transaccion,
	        folio_prestamo.fecha_devolucion,
	        folio_prestamo.observacion,
	        herramientas_cantidad.identificador AS id_herramienta,
	        herramientas_cantidad.no_serie AS numero_serie,
	        herramientas_cantidad.marca,
	        herramientas.tipo_herramienta,
	        CASE
	            WHEN historial_herramienta.id_trabajador IS NOT NULL THEN empleado.nombre
	            WHEN historial_herramienta.id_invitado IS NOT NULL THEN invitado.nombre
	        END AS nombre_persona,
	        almacenista.nombre AS nombre_almacenista
	    FROM
	        historial_herramienta
	    JOIN
	        folio_prestamo ON historial_herramienta.no_folio = folio_prestamo.no_folio
	    LEFT JOIN
	        empleado ON historial_herramienta.id_trabajador = empleado.id_trabajador
	    LEFT JOIN
	        invitado ON historial_herramienta.id_invitado = invitado.id_invitado
	    JOIN
	        almacenista ON historial_herramienta.usuario = almacenista.usuario
	    JOIN
	        herramientas_cantidad ON historial_herramienta.identificador = herramientas_cantidad.identificador
    	JOIN
    		herramientas_tipo ON herramientas_tipo.identificador = herramientas_cantidad.identificador
		JOIN
			herramientas ON herramientas.id_herramienta = herramientas_tipo.id_herramienta
	    WHERE
	        historial_herramienta.no_folio = ?
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