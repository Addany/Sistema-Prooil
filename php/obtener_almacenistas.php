<?php
include 'conexion_bd.php';

$sql = "SELECT DISTINCT nombre FROM almacenista";
$result = $conexion->query($sql);
$almacenistas = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $almacenistas[] = $row['nombre'];
    }
}

echo json_encode($almacenistas);
?>