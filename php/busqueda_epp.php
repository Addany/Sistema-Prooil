<?php
include 'conexion_bd.php';

$texto = $_POST['texto'] ?? '';
$clase = $_POST['clase'] ?? 'todos';
$talla = $_POST['talla'] ?? 'todos';
$marca = $_POST['marca'] ?? 'todos';
$fechaorden = $_POST['fechaorden'] ?? 'reciente';

$condiciones = [];

if ($texto) {
    $condiciones[] = "(epp.nombre_epp LIKE '%$texto%' OR cantidad_epp.identificador LIKE '%$texto%' OR cantidad_epp.orden_compra LIKE '%$texto%')";
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

$ordenSql = $fechaorden == 'viejo' ? 'ASC' : 'DESC';

$sql = "SELECT cantidad_epp.*, epp.nombre_epp, epp.foto, cantidad_epp.orden_compra 
        FROM cantidad_epp 
        JOIN epp_tipo ON cantidad_epp.identificador = epp_tipo.identificador
        JOIN epp ON epp_tipo.id_epp = epp.id_epp 
        $condicionSql 
        ORDER BY fecha_registro $ordenSql";
        
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_registro"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');

        echo "<tr>";
        echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del EPP' class='imagen-epp'></td>";
        echo "<td data-label='ID'>" . $row["identificador"] . "</td>";
        echo "<td data-label='Nombre'>" . $row["nombre_epp"] . "</td>";
        echo "<td data-label='Cantidad'>" . $row["cantidad"] . "</td>";
        echo "<td data-label='Marca'>" . $row["marca"] . "</td>";
        echo "<td data-label='Modelo'>" . $row["modelo"] . "</td>";
        echo "<td data-label='Clase'>" . $row["clase"] . "</td>";
        echo "<td data-label='Talla'>" . $row["talla"] . "</td>";
        echo "<td data-label='Orden de compra'>" . (isset($row["orden_compra"]) ? $row["orden_compra"] : 'No especificado') . "</td>";
        echo "<td data-label='Fecha de Registro'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'>";
        echo "<button class='accion-button' onclick='editarEPP(this)'>Editar</button>";
        echo "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='11'>No se encontraron resultados.</td></tr>";
}
$conexion->close();
?>