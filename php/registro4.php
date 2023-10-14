<?php
#Agregamos la fun para iniciar la conexion a la BD
include 'conexion_bd.php';
#Declaramos y obtenemos las variables del formulario
$nombre_epp = $_POST['name'];
$cantidad = $_POST['amount'];
$marca = $_POST['brand'];
$modelo = $_POST['model'];
$talla = $_POST['size'];
$clase = $_POST['class'];
$orden_compra = $_POST['purchase_order'];
$fecha_registro = date("Y-m-d");
$foto = addslashes(file_get_contents($_FILES['image']['tmp_name']));

#Verificamos si el tipo de herramienta ya existe en la base de datos
$consulta = "SELECT id_epp FROM epp WHERE nombre_epp='$nombre_epp'";
$resultado = $conexion->query($consulta);

if ($resultado->num_rows > 0) {
	#El tipo de herramienta ya existe, solo necesitamos su ID
	$row = $resultado->fetch_assoc();
	$last_id = $row['id_epp'];
}else{
	#El tipo de herramienta no existe, insertamos en la tabla herramientas y obtenemos el ID
	$sql = "INSERT INTO epp (nombre_epp, foto) VALUES ('$nombre_epp', '$foto')";
	if ($conexion->query($sql) === TRUE) {
		$last_id = $conexion->insert_id;
	}else {
		echo '<script language="javascript">alert("Error insertando el dato en la Base de Datos, comuniquese con el personal tecnico");</script>';
		#Descomentar para poder saber el error generado
		#echo '<script language="javascript">alert("Error insertando en epp: ' . $conexion->error . '");</script>';
		exit(); # Detenemos el script si hay un error aquí
	}
}
# Ahora insertamos en la tabla hija
$sql2 = "INSERT INTO cantidad_epp (cantidad, marca, modelo, tipo, talla, clase, orden_compra, fecha_registro) VALUES ('$cantidad', '$marca', '$modelo', 'tipo', '$talla', '$clase', '$orden_compra', '$fecha_registro')";
if ($conexion->query($sql2) === TRUE) {
	$last_id2 = $conexion->insert_id;

	#TODO
	#CREAR EPP_TIPO para la normalizacion de la tabla
	$sql3 = "INSERT INTO epp_tipo (id_epp, identificador) VALUES ('$last_id', '$last_id2')";
	if ($conexion->query($sql3) !== TRUE) {
		echo '<script language="javascript">alert("Error insertando el dato en la Base de Datos, comuniquese con el personal tecnico");</script>';
		#Descomentar para poder saber el error generado
		#echo '<script language="javascript">alert("Error insertando en epp_tipo: ' . $conexion->error . '");</script>';
	}
}else{
	echo '<script language="javascript">alert("Error insertando el dato en la Base de Datos, comuniquese con el personal tecnico");</script>';
	#Descomentar para poder saber el error generado
	#echo '<script language="javascript">alert("Error insertando en cantidad_epp: ' . $conexion->error . '");</script>';
}
echo '<script language="javascript">alert("Subido datos correctos de: ' . $nombre_epp . '");</script>';
echo '<script type="text/javascript">window.location.href="../registro_epp.php";</script>';
?>