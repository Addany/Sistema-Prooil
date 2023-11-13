<?php
include 'conexion_bd.php';

$texto = $_POST['texto'] ?? '';
$categoria = $_POST['categoria'] ?? 'todos';
$tipoRegistro = $_POST['tipoRegistro'] ?? 'todos';
$orden = isset($_POST['orden']) ? $_POST['orden'] : 'reciente';
$area = mysqli_real_escape_string($conexion, $_POST['Area'] ?? 'todos'); 

$condicionesEmpleado = [];
$condicionesInvitado = [];

// Construcción de las condiciones para cada tipo de búsqueda
if($texto){
    $condicionesEmpleado[] = "(nombre LIKE '%$texto%' OR id_trabajador LIKE '%$texto%' OR correo LIKE '%$texto%')";
    $condicionesInvitado[] = "(nombre LIKE '%$texto%' OR id_invitado LIKE '%$texto%' OR correo LIKE '%$texto%')";
}

if($categoria && $categoria != 'todos'){
    $condicionesEmpleado[] = "(estado = '$categoria')";
    $condicionesInvitado[] = "(estado = '$categoria')";
}

if($tipoRegistro && $tipoRegistro != 'todos'){
    $condicionesEmpleado[] = "(tipo_ingreso = '$tipoRegistro')";
    $condicionesInvitado[] = "(tipo_ingreso = '$tipoRegistro')";
}

if ($area && $area != 'todos') {
    $condicionesEmpleado[] = "(area_trabajo = '$area')";
    // Excluir a todos los invitados si se está buscando por un área específica
    $condicionSqlInvitado = "WHERE 1 = 0"; // Esto asegura que no se seleccionen invitados
} else {
    // Si no se busca por un área específica, incluir a los invitados en los resultados
    $condicionSqlInvitado = count($condicionesInvitado) > 0 ? 'WHERE ' . implode(' AND ', $condicionesInvitado) : '';
}

$condicionSqlEmpleado = count($condicionesEmpleado) > 0 ? 'WHERE ' . implode(' AND ', $condicionesEmpleado) : '';

$ordenSql = $orden === 'viejo' ? 'ASC' : 'DESC';

$sql = "(
    SELECT id_trabajador AS id, nombre, estado, tipo_ingreso, area_trabajo, telefono, correo, fecha_ingreso, foto, 'empleado' AS tipo 
    FROM empleado 
    $condicionSqlEmpleado
) 
UNION ALL 
(
    SELECT id_invitado AS id, nombre, estado, tipo_ingreso, 'N/A' AS area_trabajo, telefono, correo, fecha_ingreso, foto, 'invitado' AS tipo
    FROM invitado 
    $condicionSqlInvitado
)
ORDER BY fecha_ingreso $ordenSql";

$result = $conexion->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_ingreso"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');
        $id = $row["id"];
        $areaTrabajo = $row["tipo"] == 'empleado' ? $row["area_trabajo"] : 'N/A';
        echo "<tr>";
        echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del empleado' class='foto-trabajador'></td>";
        if ($row["estado"] == "Activo") {
            echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-check-circle' style='color:green;'></i> " . $row["estado"] . "</span></td>";
        } elseif ($row["estado"] == "Inactivo") {
            echo "<td data-label='Estado'><span class='estatus'><i class='fas fa-times-circle' style='color:red;'></i> " . $row["estado"] . "</span></td>";
        } else {
            echo "<td data-label='Estado'><span class='estatus'>" . $row["estado"] . "</span></td>";
        }
        echo "<td data-label='Tipo de Registro'>" . $row["tipo_ingreso"] . "</td>";
        echo "<td data-label='ID'>" . $id . "</td>";
        echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
        echo "<td data-label='Area'>" . $areaTrabajo . "</td>";
        echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
        echo "<td data-label='Correo Electrónico'>" . $row["correo"] . "</td>";
        echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'><button class='accion-button' onclick='editarTrabajador(this)'>Editar</button></td>";
        echo "</tr>";
    }
} else {
    echo "<tr><td colspan='11'>No se encontraron resultados.</td></tr>";
}

$conexion->close();
?>
