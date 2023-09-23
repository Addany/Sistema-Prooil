<?php
$usuario = $_POST['username'];
$contrasena = $_POST['password'];

if($usuario == "jose" && $contrasena == "perez"){
	header("location: ../home.php");
}else{
	echo "DATOS INCORRECTOS";
}

?>