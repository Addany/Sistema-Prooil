<?php
include 'conexion_bd.php';
if(isset($_POST['code'])) {
    $code = $_POST['code'];
    // Aquí tu conexión a la base de datos
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
