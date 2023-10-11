<?php
#Agregamos la fun para iniciar la conexion a la BD
include 'conexion_bd.php';

#Declaramos y obtenemos las variables del formulario
$tipo_herramienta = $_POST['tool'];
$marca = $_POST['brand'];
$color = $_POST['color'];
$orden_compra = $_POST['purchase_order'];
$tamanio = $_POST['size'];
$numero_serie = $_POST['serial_number'];
$estado_herramienta = $_POST['tool_status'];
$foto_herramienta = addslashes(file_get_contents($_FILES['image']['tmp_name']));
$fecha = date("Y-m-d");

#Verificamos si el tipo de herramienta ya existe en la base de datos
$consulta = "SELECT id_herramienta FROM herramientas WHERE tipo_herramienta='$tipo_herramienta'";
$resultado = $conexion->query($consulta);

if ($resultado->num_rows > 0) {
	#El tipo de herramienta ya existe, solo necesitamos su ID
	$row = $resultado->fetch_assoc();
	$last_id = $row['id_herramienta'];
}else{
	#El tipo de herramienta no existe, insertamos en la tabla herramientas y obtenemos el ID
	$sql = "INSERT INTO herramientas (tipo_herramienta, foto) VALUES ('$tipo_herramienta', '$foto_herramienta')";
	if ($conexion->query($sql) === TRUE) {
		$last_id = $conexion->insert_id;
	} else {
		#echo '<script language="javascript">alert("Error insertando el dato en la Base de Datos, comuniquese con el personal tecnico");</script>';
		#Descomentar para poder saber el error generado
		echo '<script language="javascript">alert("Error insertando en herramientas: ' . $conexion->error . '");</script>';
		exit(); # Detenemos el script si hay un error aquí
	}
}
# Ahora insertamos en la tabla hija
$sql2 = "INSERT INTO herramientas_cantidad (marca, color, tamaño, no_serie, orden_compra, fecha_registro, estado) VALUES ('$marca', '$color', '$tamanio', '$numero_serie', '$orden_compra', '$fecha', '$estado_herramienta')";
if ($conexion->query($sql2) === TRUE) {
	$last_id2 = $conexion->insert_id;

	$sql3 = "INSERT INTO herramientas_tipo (id_herramienta, identificador) VALUES ('$last_id', '$last_id2')";
	if ($conexion->query($sql3) !== TRUE) {
		#echo '<script language="javascript">alert("Error insertando el dato en la Base de Datos, comuniquese con el personal tecnico");</script>';
		#Descomentar para poder saber el error generado
		echo '<script language="javascript">alert("Error insertando en herramientas_tipo: ' . $conexion->error . '");</script>';
	}
}else{
	#echo '<script language="javascript">alert("Error insertando el dato en la Base de Datos, comuniquese con el personal tecnico");</script>';
	#Descomentar para poder saber el error generado
	echo '<script language="javascript">alert("Error insertando en herramientas_cantidad: ' . $conexion->error . '");</script>';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código QR <?php echo $last_id2; ?></title>
    <script src="https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@latest/qrcode.min.js"></script>
    <style>
        /* Ocultamos el div del QR */
        #qrcode {
            display: none;
        }
    </style>
</head>
<body>

    <!-- Div oculto donde se generará el código QR -->
    <div id="qrcode"></div>

    <script>
        function generarYDescargarQR(data) {
            var qrcode = new QRCode("qrcode", {
                text: data,
                width: 164,
                height: 164	
            });

            setTimeout(() => {
                var canvas = document.querySelector('#qrcode canvas');
                var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"); 
                var link = document.createElement('a');
                link.download = 'herramienta<?php echo $last_id2; ?>.png';
                link.href = img;
                link.click();

                setTimeout(() => {
                	window.location.href = "../registro_herramienta.php";
                }, 1000);  // Redirecciona después de 1 segundo para dar tiempo a que el QR se descargue

            }, 500);
        }

        // Ejecutamos la función con el valor de PHP.
        generarYDescargarQR("<?php echo $last_id2; ?>");

    </script>
</body>
</html>