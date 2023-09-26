<?php
#Incluye la conexion hacia la BD
include 'conexion_bd.php';
#fun para crea una sesión o reanuda la actual basada en un identificador de sesión pasado mediante una petición GET o POST, o pasado mediante una cookie.
session_start();
#Login y verificacion de datos en la BD
$usuario = $_POST['username'];
$contrasena = $_POST['password'];
$sql=$conexion->query("SELECT * FROM almacenista WHERE usuario='$usuario'");
$objeto = $sql->fetch_object();
$contra_hashed = $objeto->contrasenia;

if (!password_verify($contrasena, $contra_hashed)) {
	echo '<script language="javascript">alert("Usuario o Contraseña incorrecta");</script>';
	echo '<script>history.go(-1);</script>';
	echo '<script type="text/javascript">window.location.href="../";</script>';
}else{
	$_SESSION['username'] = $usuario;
	header("location: ../home.php");
}
?>