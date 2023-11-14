<?php
include 'conexion_bd.php';

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['arrayIDs'])) {
    $codigos = $data['arrayIDs'];
    $almacenista = $data['textNameStorer'];
    $idTrabajador = $data['textNameApplicant'];
    $observacion = $data['textObservation'];
    $fecha = date("Y-m-d");
    $tipoTrabajador = "";

    if (strpos($idTrabajador, 'e_') === 0) {
        $id = str_replace('e_', '', $idTrabajador);
        $tipoTrabajador = "empleado";
    }elseif (strpos($idTrabajador, 'i_') === 0) {
        $id = str_replace('i_', '', $idTrabajador);
        $tipoTrabajador = "invitado";
    }else{
        echo json_encode(['error' => 'Formato de ID desconocido']);
        exit();
    }

    $sql = "INSERT INTO folio_prestamo (fecha_transaccion, estado, observacion) VALUES ('$fecha', 'Activo','$observacion')";
    $conexion->query($sql);

    if ($conexion->errno) {
        echo json_encode(['error' => 'Error al insertar en folio_prestamo']);
        exit();
    }
    $noFolio = $conexion->insert_id;

    foreach ($codigos as $id_herramientas) {
        if ($tipoTrabajador == "empleado") {
            $sql2 = "INSERT INTO historial_herramienta (no_folio, identificador, usuario, id_trabajador) VALUES ('$noFolio', '$id_herramientas', '$almacenista', '$id')";
        }else{
            $sql2 = "INSERT INTO historial_herramienta (no_folio, identificador, id_invitado, usuario) VALUES ('$noFolio', '$id_herramientas', '$id', '$almacenista')";
        }
        $conexion->query($sql2);
        if ($conexion->errno) {
            echo json_encode(['error' => 'Error al insertar en historial_herramienta'. $conexion->error]);
            exit();
        }

        $sql3 = "UPDATE herramientas_cantidad SET disponibilidad = 'En Prestamo' WHERE identificador = '$id_herramientas'";
        $conexion->query($sql3);
        if ($conexion->errno) {
            echo json_encode(['error' => 'Error al actualizar la disponibilidad de la herramienta' . $conexion->error]);
            exit();
        }
    }
    echo json_encode(['folio' => $noFolio]);
}
?>

