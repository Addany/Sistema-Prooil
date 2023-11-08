<?php
include 'conexion_bd.php';

$texto = $_POST['texto'];
$clase = $_POST['clase'];
$talla = $_POST['talla'];
$marca = $_POST['marca'];

$condiciones = [];

if ($texto) {
    $condiciones[] = "(marca LIKE '%$texto%' OR modelo LIKE '%$texto%' OR tipo LIKE '%$texto%')";
}

if ($clase && $clase != 'todos') {
    $condiciones[] = "(clase = '$clase')";
}

if ($talla && $talla != 'todos') {
    $condiciones[] = "(talla = '$talla')";
}

if ($marca && $marca != 'todos') {
    $condiciones[] = "(marca = '$marca')";
}

$condicionSql = implode(' AND ', $condiciones);
if ($condicionSql) {
    $condicionSql = "WHERE $condicionSql";
}

$ordenSql = $fechaorden == 'reciente' ? 'ORDER BY fecha_registro DESC' : 'ORDER BY fecha_registro ASC';

$sql = "SELECT * FROM cantidad_epp $condicionSql $ordenSql";  
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_registro"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');
        echo "<tr>";
        echo "<td data-label='ID'>" . $row["id_epp"] . "</td>";
        echo "<td data-label='Cantidad'>" . $row["cantidad"] . "</td>";
        echo "<td data-label='Marca'>" . $row["marca"] . "</td>";
        echo "<td data-label='Modelo'>" . $row["modelo"] . "</td>";
        echo "<td data-label='Tipo'>" . $row["tipo"] . "</td>";
        echo "<td data-label='Talla'>" . $row["talla"] . "</td>";
        echo "<td data-label='Clase'>" . $row["clase"] . "</td>";
        echo "<td data-label='Orden de compra'>" . $row["orden_compra"] . "</td>";
        echo "<td data-label='Fecha de Registro'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'>";
        echo "<button class='accion-button' onclick='editarEPP(this)'>Editar</button>";
        echo "<button class='accion-button' onclick='intentarEliminar(this)'>Eliminar</button>";
        echo "</td>";
        echo "</tr>";
    }
} else {
    echo "0 resultados";
}
?>