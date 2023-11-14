<?php
include 'conexion_bd.php';
header('Content-Type: application/json');

$inputJSON = file_get_contents('php://input');
$data = json_decode($inputJSON, true);
if ($data === null) {
    echo json_encode(['error' => true, 'message' => 'Datos no recibidos o formato incorrecto']);
    exit;
}

$idEmpleado = $data['applicantName'];
$idAlmacenista = $data['storerName'];
$observacion = $data['containerObservation'];
$fecha = date("Y-m-d");
$tipoTrabajador = "";

if (strpos($idEmpleado, 'e_') === 0) {
    $id = str_replace('e_', '', $idEmpleado);
    $tipoTrabajador = "empleado";
}elseif (strpos($idEmpleado, 'i_') === 0) {
    $id = str_replace('i_', '', $idEmpleado);
    $tipoTrabajador = "invitado";
}else{
    echo json_encode(['error' => 'Formato de ID desconocido']);
    exit();
}

try {
	$sql= "INSERT INTO folio_epp (fecha_transaccion, observacion) VALUES ('$fecha','$observacion')";
	$conexion->query($sql);
	if ($conexion->errno) {
        echo json_encode(['error' => 'Error al insertar en folio_epp']);
        exit();
    }
    $noFolio = $conexion->insert_id;

    foreach ($data['toolsIDs'] as $index => $identificador) {
        $cantidad = $data['amountTools'][$index];
        
        if ($tipoTrabajador == "empleado") {
            $sql2 = "INSERT INTO historial_epp (no_folio, identificador, id_trabajador, usuario, cantidad) VALUES ('$noFolio', '$identificador', '$id', '$idAlmacenista', '$cantidad')";
        } elseif ($tipoTrabajador == "invitado") {
            $sql2 = "INSERT INTO historial_epp (no_folio, identificador, id_invitado, usuario, cantidad) VALUES ('$noFolio', '$identificador', '$id', '$idAlmacenista', '$cantidad')";
        }

        $conexion->query($sql2);
        if ($conexion->errno) {
            echo json_encode(['error' => true, 'message' => 'Error al insertar en historial_epp']);
            exit();
        }
    }
    //Se envia el folio al frontend
    echo json_encode(['folio' => $noFolio]);
} catch (Exception $e) {
    echo json_encode(['error' => true, 'message' => $e->getMessage()]);
}
?>