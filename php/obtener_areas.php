<?php
include 'conexion_bd.php';

$sql = "SELECT DISTINCT area_trabajo FROM empleado WHERE area_trabajo IS NOT NULL AND area_trabajo <> ''";
$result = $conexion->query($sql);

$areas = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $areas[] = $row['area_trabajo'];
    }
}

echo json_encode($areas);
?>