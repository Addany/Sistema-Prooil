<?php
include 'conexion_bd.php';

$texto = $_POST['texto'];
$fechaInicio = $_POST['fechaInicio'];
$fechaFin = $_POST['fechaFin'];
$categoria = $_POST['categoria'];

$condiciones = [];

if ($texto) {
    $condiciones[] = "(nombre LIKE '%$texto%' OR usuario LIKE '%$texto%' OR correo LIKE '%$texto%')";
}

if ($fechaInicio) {
    $condiciones[] = "(fecha_ingreso >= '$fechaInicio')";
}

if ($fechaFin) {
    $condiciones[] = "(fecha_ingreso <= '$fechaFin')";
}

if ($categoria && $categoria != 'todos') {
    $condiciones[] = "(estado = '$categoria')";
}

$condicionSql = implode(' AND ', $condiciones);
if ($condicionSql) {
    $condicionSql = "WHERE $condicionSql";
}

$sql = "SELECT * FROM almacenista $condicionSql";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_ingreso"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');
        echo "<tr>";
        echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
        echo "<td data-label='Usuario'>" . $row["usuario"] . "</td>";
        echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
        echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
        echo "<td data-label='Correo'>" . $row["correo"] . "</td>";
        echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'><button class='accion-button' onclick='editarAlmacenista(this)'>Editar</button></td>";
        echo "</tr>";
    }
}
?>