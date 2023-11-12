<?php
include 'conexion_bd.php';

// Obtener marcas distintas
$sqlMarca = "SELECT DISTINCT marca FROM cantidad_epp WHERE marca IS NOT NULL AND marca <> ''";
$resultMarca = $conexion->query($sqlMarca);
$marcas = array();
if ($resultMarca->num_rows > 0) {
    while($row = $resultMarca->fetch_assoc()) {
        $marcas[] = $row['marca'];
    }
}

// Obtener clases distintas
$sqlClase = "SELECT DISTINCT clase FROM cantidad_epp WHERE clase IS NOT NULL AND clase <> ''";
$resultClase = $conexion->query($sqlClase);
$clases = array();
if ($resultClase->num_rows > 0) {
    while($row = $resultClase->fetch_assoc()) {
        $clases[] = $row['clase'];
    }
}

// Obtener tallas distintas
$sqlTalla = "SELECT DISTINCT talla FROM cantidad_epp WHERE talla IS NOT NULL AND talla <> ''";
$resultTalla = $conexion->query($sqlTalla);
$tallas = array();
if ($resultTalla->num_rows > 0) {
    while($row = $resultTalla->fetch_assoc()) {
        $tallas[] = $row['talla'];
    }
}

// Combinar todos los resultados en un solo array para JSON
$filtros = array(
    'marcas' => $marcas,
    'clases' => $clases,
    'tallas' => $tallas
);

echo json_encode($filtros);
?>
