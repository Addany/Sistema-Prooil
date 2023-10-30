<?php
include 'conexion_bd.php';

$texto = $_POST['texto'];
$fechaInicio = $_POST['fechaInicio'];
$categoria = $_POST['categoria'];
$tipoRegistro = $_POST['tipoRegistro'];
$area = mysqli_real_escape_string($conexion, $_POST['Area']); 

$condicionesEmpleado = [];
$condicionesInvitado = [];

if($texto){
    $condicionesEmpleado[] = "(nombre LIKE '%$texto%' OR id_trabajador LIKE '%$texto%' OR correo LIKE '%$texto%')";
    $condicionesInvitado[] = "(nombre LIKE '%$texto%' OR id_invitado LIKE '%$texto%' OR correo LIKE '%$texto%')";  
}

if($fechaInicio){
    $condicionesEmpleado[] = "(fecha_ingreso >= '$fechaInicio')";
    $condicionesInvitado[] = "(fecha_ingreso >= '$fechaInicio')";
}

if($categoria && $categoria != 'todos'){
    $condicionesEmpleado[] = "(estado = '$categoria')";
    $condicionesInvitado[] = "(estado = '$categoria')";
}

if($tipoRegistro && $tipoRegistro != 'todos'){  
    $condicionesEmpleado[] = "(tipo_ingreso = '$tipoRegistro')";
    $condicionesInvitado[] = "(tipo_ingreso = '$tipoRegistro')";
}

if($area && $area != 'todos'){  
    $condicionesEmpleado[] = "(area_trabajo = '$area')";
}

$condicionSqlEmpleado = implode(' AND ', $condicionesEmpleado);
if($condicionSqlEmpleado){
    $condicionSqlEmpleado = "WHERE $condicionSqlEmpleado";
}

$condicionSqlInvitado = implode(' AND ', $condicionesInvitado);
if($condicionSqlInvitado){
    $condicionSqlInvitado = "WHERE $condicionSqlInvitado";
}

$sql = "SELECT * FROM empleado $condicionSqlEmpleado";
$result = $conexion->query($sql);

$sql2 = "SELECT * FROM invitado $condicionSqlInvitado";  
$result2 = $conexion->query($sql2);


if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
        $fechaObj = date_create_from_format('Y-m-d', $row["fecha_ingreso"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');
        echo "<tr>";
        echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del empleado' class='foto-trabajador'></td>";
        echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
        echo "<td data-label='Tipo de Registro'>" . $row["tipo_ingreso"] . "</td>";
        echo "<td data-label='ID'>" . $row["id_trabajador"] . "</td>";
        echo "<td data-label='Nombre'>" . $row["nombre"] . "</td>";
        echo "<td data-label='Area'>" . $row["area_trabajo"] . "</td>";
        echo "<td data-label='Teléfono'>" . $row["telefono"] . "</td>";
        echo "<td data-label='Correo Electrónico'>" . $row["correo"] . "</td>";
        echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'><button class='accion-button' onclick='editarTrabajador(this)'>Editar</button></td>";
        echo "</tr>";
    }
} 

if ($area == 'todos' && $result2->num_rows > 0) {
    while($row2 = $result2->fetch_assoc()) {
        $foto = isset($row2['foto']) && $row2['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row2['foto']) : 'Resources/Imagen1.webp';
        $fechaObj = date_create_from_format('Y-m-d', $row2["fecha_ingreso"]);
        $fechaFormateada = $fechaObj->format('d/m/Y');
        echo "<tr>";
        echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto del invitado' class='foto-trabajador'></td>";
        echo "<td data-label='Estado'>" . $row2["estado"] . "</td>";  // Cambiado $row a $row2
        echo "<td data-label='Tipo de Registro'>" . $row2["tipo_ingreso"] . "</td>";  // Cambiado $row a $row2
        echo "<td data-label='ID'>" . $row2["id_invitado"] . "</td>";  // Cambiado $row a $row2
        echo "<td data-label='Nombre'>" . $row2["nombre"] . "</td>";  // Cambiado $row a $row2
        echo "<td data-label='Area'>N/A</td>";
        echo "<td data-label='Teléfono'>" . $row2["telefono"] . "</td>";  // Cambiado $row a $row2
        echo "<td data-label='Correo Electrónico'>" . $row2["correo"] . "</td>";  // Cambiado $row a $row2
        echo "<td data-label='Fecha de Ingreso'>" . $fechaFormateada . "</td>";
        echo "<td data-label='Acciones'><button class='accion-button' onclick='editarTrabajador(this)'>Editar</button></td>";
        echo "</tr>";
    }
} 

