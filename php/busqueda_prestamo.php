<?php
include 'conexion_bd.php';

$texto = $_POST['texto'] ?? '';
$almacenista = $_POST['almacenista'] ?? 'todos';
$fechaInicio = $_POST['fechaInicio'] ?? '';
$fechaFin = $_POST['fechaFin'] ?? '';
$status = $_POST['status'] ?? 'todos';

$condiciones = [];

// Condición para búsqueda por texto
if ($texto) {
    $condiciones[] = "(
        empleado.nombre LIKE '%$texto%' OR 
        invitado.nombre LIKE '%$texto%' OR 
        folio_prestamo.no_folio LIKE '%$texto%'
    )";
}

// Condición para el almacenista
if ($almacenista != 'todos') {
    $condiciones[] = "almacenista.nombre = '$almacenista'";
}

// Condición para fechas
if ($fechaInicio && $fechaFin) {
    $condiciones[] = "folio_prestamo.fecha_transaccion BETWEEN '$fechaInicio' AND '$fechaFin'";
}

// Condición para el status
if ($status != 'todos') {
    $condiciones[] = "folio_prestamo.estado = '$status'";
}

// Construir la consulta SQL
$condicionSql = implode(' AND ', $condiciones);
if ($condicionSql) {
    $condicionSql = "WHERE $condicionSql";
}

$sql = "
    SELECT historial_herramienta.*, folio_prestamo.*, GROUP_CONCAT(historial_herramienta.identificador) AS identificadores,
    CASE
    WHEN historial_herramienta.id_trabajador IS NOT NULL THEN empleado.nombre
    WHEN historial_herramienta.id_invitado IS NOT NULL THEN invitado.nombre
    END AS nombre_persona,
    almacenista.nombre AS nombre_almacenista
    FROM historial_herramienta
    JOIN folio_prestamo ON historial_herramienta.no_folio = folio_prestamo.no_folio
    LEFT JOIN empleado ON historial_herramienta.id_trabajador = empleado.id_trabajador
    LEFT JOIN invitado ON historial_herramienta.id_invitado = invitado.id_invitado
    JOIN almacenista ON historial_herramienta.usuario = almacenista.usuario
    $condicionSql
    GROUP BY folio_prestamo.no_folio
    ORDER BY folio_prestamo.fecha_transaccion DESC
";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_transaccion"]);
        $transaccion = $fechaObj->format('d/m/Y');
        $fechaObj1 = null;
        $devolucion = '';
        if(isset($row["fecha_devolucion"]) && !is_null($row["fecha_devolucion"]) && $row["fecha_devolucion"] != '') {
            $fechaObj1 = date_create_from_format('Y-m-d', $row["fecha_devolucion"]);
            $devolucion = $fechaObj1->format('d/m/Y');
        }
        echo "<tr>";
        echo "<td data-label='Folio'>" . $row["no_folio"] . "</td>";
        echo "<td data-label='Nombre del Trabajador'>" . $row["nombre_persona"] . "</td>";
        echo "<td data-label='Fecha de Transacción'>" . $transaccion . "</td>";
        echo "<td data-label='Fecha de Devolución'>" . $devolucion . "</td>";
        echo "<td data-label='Quien Autorizó'>" . $row["nombre_almacenista"] . "</td>";
        echo "<td data-label='Observaciones'>" . $row["observacion"] . "</td>";
        if ($row["estado"] == "Activo") {
            echo "<td data-label='Estado'><i <i class='fa-solid fa-circle-exclamation' style='color:gray;'></i> Activo</td>";
        } else if ($row["estado"] == "Concretado") {
            echo "<td data-label='Estado'><i class='fas fa-check-circle' style='color:green;'></i> Concretado</td>";
        } else {
            echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
        }

        echo "<td data-label='Acciones'>";
        echo "<button class='accion-button' onclick='verDetalles(" . $row["no_folio"] . ")'>Ver</button>";
        echo "<button class='accion-button'>Generar documento</button>";
        echo "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='8'>No se encontraron resultados.</td></tr>";
}
$conexion->close();
?>