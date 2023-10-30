<?php
include 'conexion_bd.php';

$sqlMarca = "SELECT DISTINCT marca FROM cantidad_epp WHERE marca IS NOT NULL AND marca <> ''";  // Cambiado "historial_epp" por "cantidad_epp"
$resultMarca = $conexion->query($sqlMarca);
$marcas = array();
if ($resultMarca->num_rows > 0) {
    while($row = $resultMarca->fetch_assoc()) {
        $marcas[] = $row['marca'];
    }
}

$sqlClase = "SELECT DISTINCT clase FROM cantidad_epp WHERE clase IS NOT NULL AND clase <> ''";  // Cambiado "historial_epp" por "cantidad_epp"
$resultClase = $conexion->query($sqlClase);
$clases = array();
if ($resultClase->num_rows > 0) {
    while($row = $resultClase->fetch_assoc()) {
        $clases[] = $row['clase'];
    }
}

$sqlTalla = "SELECT DISTINCT talla FROM cantidad_epp WHERE talla IS NOT NULL AND talla <> ''";  // Cambiado "historial_epp" por "cantidad_epp"
$resultTalla = $conexion->query($sqlTalla);
$tallas = array();
if ($resultTalla->num_rows > 0) {
    while($row = $resultTalla->fetch_assoc()) {
        $tallas[] = $row['talla'];
    }
}
?>
