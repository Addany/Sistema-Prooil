<?php
include 'conexion_bd.php';
$usuario = $_POST['username'];
$contrasena = $_POST['password'];
$sql=$conexion->query("SELECT * FROM almacenista WHERE usuario='$usuario' AND contrasenia='$contrasena'");


if($datos=$sql->fetch_object()){
	header("location: ../home.php");
}else{
	echo '<script language="javascript">alert("Usuario o Contraseña incorrecta");</script>';
}

?>