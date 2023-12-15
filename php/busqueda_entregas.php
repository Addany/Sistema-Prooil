<?php
include 'conexion_bd.php';

$texto = $_POST['texto'] ?? '';
$almacenista = $_POST['almacenista'] ?? 'todos';

$condiciones = [];

// Condición para búsqueda por texto
if ($texto) {
    $condiciones[] = "(
        empleado.nombre LIKE '%$texto%' OR 
        invitado.nombre LIKE '%$texto%' OR 
        folio_epp.no_folio LIKE '%$texto%'
    )";
}

// Condición para el almacenista
if ($almacenista != 'todos') {
    $condiciones[] = "(almacenista.nombre = '$almacenista')";
}

$condicionSql = implode(' AND ', $condiciones);
if ($condicionSql) {
    $condicionSql = "WHERE $condicionSql";
}

$sql = "SELECT historial_epp.*, folio_epp.*, cantidad_epp.*,
        CASE
        WHEN historial_epp.id_trabajador IS NOT NULL THEN empleado.nombre
        WHEN historial_epp.id_invitado IS NOT NULL THEN invitado.nombre
        END AS nombre_persona,
        almacenista.nombre AS nombre_almacenista
        FROM historial_epp
        JOIN cantidad_epp ON historial_epp.identificador = cantidad_epp.identificador
        JOIN folio_epp ON historial_epp.no_folio = folio_epp.no_folio
        LEFT JOIN empleado ON historial_epp.id_trabajador = empleado.id_trabajador
        LEFT JOIN invitado ON historial_epp.id_invitado = invitado.id_invitado
        JOIN almacenista ON historial_epp.usuario = almacenista.usuario
        $condicionSql
        GROUP BY folio_epp.no_folio
        ORDER BY folio_epp.fecha_transaccion DESC";
$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_transaccion"]);
        $transaccion = $fechaObj->format('d/m/Y');

        echo "<tr>";
        echo "<td data-label='Folio'>" . $row["no_folio"] . "</td>";
        echo "<td data-label='Fecha de Transacción'>" . $transaccion . "</td>";
        echo "<td data-label='Trabajador solicitante'>" . $row["nombre_persona"] . "</td>";
        echo "<td data-label='Almacenista que Autoriza'>" . $row["nombre_almacenista"] . "</td>";
        echo "<td data-label='Observaciones'>" . $row["observacion"] . "</td>";
        echo "<td data-label='Acciones'>";
        echo "<button class='accion-button' onclick='verDatos(" . $row["no_folio"] . ")'>Ver</button>";
        echo "<button class='accion-button'>Generar documento</button>";
        echo "</td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='6'>No se encontraron resultados.</td></tr>";
}
$conexion->close();
?>