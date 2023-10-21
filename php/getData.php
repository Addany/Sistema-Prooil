<?php
include 'conexion_bd.php';
if(isset($_POST['code'])) {
    $code = $_POST['code'];
    #Comprobamos que el codigo QR este disponible y no en prestamo
    /*$sql_check = "SELECT folio_prestamo.estado 
              FROM historial_herramienta 
              INNER JOIN folio_prestamo ON historial_herramienta.no_folio = folio_prestamo.no_folio
              WHERE historial_herramienta.identificador = '$code' AND folio_prestamo.estado = 'activo'";*/
    $sql_check = "SELECT * FROM herramientas_cantidad WHERE identificador = '$code' AND disponibilidad = 'En prestamo'";
    $result = $conexion->query($sql_check);
    if($result->num_rows > 0){
        echo json_encode(['alerta' => 'La herramienta ya ha sido escaneada y está en préstamo.']);
        exit();
    }
    
    $sql = "SELECT * FROM herramientas_cantidad WHERE identificador = '$code'"; 
    // ATENCIÓN: Esta línea es vulnerable a inyección SQL. Usa prepared statements para más seguridad.
    $result = $conexion->query($sql);
    
    if($result && $result->num_rows > 0){
        $row = $result->fetch_assoc();
        echo json_encode($row);  // Devuelve los datos como JSON
    }else{
        echo json_encode(['error' => 'No se encontro el codigo en la base de datos']);
    }
}
?>
