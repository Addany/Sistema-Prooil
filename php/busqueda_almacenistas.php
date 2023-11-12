<?php
include 'conexion_bd.php';

$texto = $_POST['texto'];
$categoria = $_POST['categoria'];
$orden = $_POST['orden'];  

$condiciones = [];

if ($texto) {
    $condiciones[] = "(nombre LIKE '%$texto%' OR usuario LIKE '%$texto%' OR correo LIKE '%$texto%')";
}

if ($categoria && $categoria != 'todos') {
    $condiciones[] = "(estado = '$categoria')";
}

$condicionSql = implode(' AND ', $condiciones);
if ($condicionSql) {
    $condicionSql = "WHERE $condicionSql";
}

$ordenSql = $orden == 'viejo' ? 'ASC' : 'DESC';

$sql = "SELECT * FROM almacenista $condicionSql ORDER BY fecha_ingreso $ordenSql";  
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_ingreso"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');
        echo "<tr>";
        if ($row["estado"] == "Activo") {
            echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-check-circle' style='color:green;'></i> " . $row["estado"] . "</span></td>";
        } elseif ($row["estado"] == "Inactivo") {
            echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-times-circle' style='color:red;'></i> " . $row["estado"] . "</span></td>";
        } else {
            echo "<td data-label='Estado'><span class='estatus'>" . $row["estado"] . "</span></td>";
        } 
        echo "<td data-label='Usuario'>" . $row["usuario"] . "</td>";
        echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
        echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
        echo "<td data-label='Correo'>" . $row["correo"] . "</td>";
        echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'><button class='accion-button' onclick='editarAlmacenista(this)'>Editar</button></td>";
        echo "</tr>";
    }
}else {
    echo "<tr><td colspan='8'>No se encontraron resultados.</td></tr>";
}  
$conexion->close();
?>