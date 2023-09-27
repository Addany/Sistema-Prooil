<?php
#Agregamos la fun para iniciar la conexion a la BD
include 'conexion_bd.php';
#Declaramos y obtenemos las variables del formulario
$usuario = $_POST["user"];
$nombre = $_POST["name"];
$telefono = $_POST["phone"];
$correo = $_POST["email"];
$contrasenia = $_POST["password"];
$contrasenia2 = $_POST["repassword"];
$fecha = date("Y-m-d");
#Verificamos que ambas contraseñas coincidan
if ($contrasenia != $contrasenia2) {
    echo '<script language="javascript">alert("La contraseñas no coinciden");</script>';
    echo '<script>history.go(-1);</script>';
    echo '<script type="text/javascript">window.location.href="../registro_almacenista.php";</script>';
}else{
    #verificamos que no exista otro usuario con ese nombre
    $verificacion = $conexion->query("SELECT usuario FROM almacenista WHERE usuario = '$usuario'");
    if($verificacion->num_rows > 0){
        echo '<script language="javascript">alert("El nombre de usuario: ' . $usuario . ' ya existe, intente con otro distinto");</script>';
        echo "<script>history.go(-1);</script>";
        echo '<script type="text/javascript">window.location.href="../registro_almacenista.php";</script>';
    }else{
        #Encriptamos las contraseñas para que ninguna persona pueda verlas y asi mantener la seguridad del sistema
        $contra_hash = password_hash($contrasenia, PASSWORD_DEFAULT);
        #Mandamos todos los datos a la BD
        $sql=$conexion->query("INSERT INTO almacenista (usuario, contrasenia, nombre, telefono, correo, estado, fecha_ingreso) VALUES ('$usuario', '$contra_hash', '$nombre', '$telefono', '$correo', 'Activo', '$fecha')");
        #Avisamos al usuario que sus datos han sido correctamente subidos
        echo '<script language="javascript">alert("Creado correctamente usuario: ' . $usuario . '");</script>';
        echo '<script type="text/javascript">window.location.href="../registro_almacenista.php";</script>';
    }
}
?>