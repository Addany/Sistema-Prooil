<?php 
session_start();
if (isset($_SESSION['tiempo'])) {
  $inactivo = 120;
  $vida_session = time() - $_SESSION['tiempo'];
  if ($vida_session > $inactivo) {
    session_unset();
    session_destroy();
    header("location: ../index.php");
    exit();
  }else{
    $_SESSION['tiempo'] = time();
  }
}
#Obliga al usuario a iniciar sesion para evitar modificacion de datos
$almacenista = $_SESSION['username'];
if (!isset($almacenista)) {
  header("location: ../index.php");
}
?>