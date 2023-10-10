<?php
#Agregamos la fun para iniciar la conexion a la BD
include 'conexion_bd.php';
#Declaramos y obtenemos las variables del formulario
$nombre = $_POST['name'];
$telefono = $_POST['phone'];
$correo = $_POST['email'];
$tipo_ingreso = $_POST['ingreso'];
$imagen = addslashes(file_get_contents($_FILES['image']['tmp_name']));
$fecha = date("Y-m-d");
#Insertamos los datos a la BD y anunciamos al usuario del ingreso exitoso
$sql=$conexion->query("INSERT INTO invitado (nombre, telefono, correo, fecha_ingreso, tipo_ingreso, estado, foto) VALUES ('$nombre', '$telefono', '$correo', '$fecha', '$tipo_ingreso', 'Activo', '$imagen')");
echo '<script language="javascript">alert("Creado correctamente invitado: ' . $nombre . '");</script>';
echo '<script type="text/javascript">window.location.href="../registro_invitado.php";</script>';
?>