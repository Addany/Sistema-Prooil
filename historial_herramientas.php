<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial del Almacén</title>
  <link rel="stylesheet" href="css/estilosalmacen.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="icon" href="Resources/Icons/Tool.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>
  <?php
  include 'php/session.php';
  include 'php/conexion_bd.php';
  ?>

  <div id="page-container">
    <div id="navbar"></div>
    
    <form class="form-buscar">
      <div class="input-group">
        <label for="buscador">Busqueda por texto:</label>
        <input type="text" id="buscador" placeholder="Buscar por texto o ID">
      </div>

      <div class="input-group">
        <label for="fechaInicio">Fecha Inicio:</label>
        <input type="date" id="fechaInicio">
      </div>

      <div class="input-group">
        <label for="fechaFin">Fecha Fin:</label>
        <input type="date" id="fechaFin">
      </div>

      <div class="input-group">
        <label for="categoria">Categoria:</label>
        <select id="categoria">
          <option value="todos">Todos</option>
          <option value="Prestado">Prestado</option>
          <option value="Devuelto">Devuelto</option>
        </select>
      </div>

      <div class="input-group">
        <button type="button" id="eliminarBusqueda">Limpiar busqueda</button>
      </div>
    </form>

    <section class="seccion-tabla">
      <table id="tabla-historial">
        <thead>
          <tr>
            <th>Foto</th>
            <th>ID</th>
            <th>Tipo de herramienta</th>
            <th>Marca</th>
            <th>Orden de compra</th>
            <th>Tamaño</th>
            <th>No. Serie</th>
            <th>Estado</th>
            <th>Color</th>
            <th>Fecha de Registro</th>
            <th>Status</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <?php
          if ($conexion->connect_error) {
            die();
          }
          $sql = "SELECT * FROM herramientas_cantidad";
          $result = $conexion->query($sql);
          $vacio = "pendiente";

          if ($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
              echo "<tr>";
              echo "<td data-label='Foto'><img src='Resources/Imagen1.webp' alt='Foto de ' class='imagen-herramienta' /></td>";
              echo "<td data-label='ID'>" . $row["identificador"] . "</td>";
              echo "<td data-label='Tipo de herramienta'>" . $vacio . "</td>";
              echo "<td data-label='Marca'>" . $row["marca"] . "</td>";
              echo "<td data-label='Orden de compra'>" . $row["orden_compra"] . "</td>";
              echo "<td data-label='Tamaño'>" . $row["tamaño"] . "cm</td>";
              echo "<td data-label='No. Serie'>" . $row["no_serie"] . "</td>";
              echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
              echo "<td data-label='Color'>" . $row["color"] . "</td>";
              echo "<td data-label='Fecha de Registro'>" . $row["fecha_registro"] . "</td>";
              echo "<td data-label='Estatus'>" . $vacio . "</td>";
              // ... Repite para cada columna de tu base de datos
              echo "<td data-label='Acciones'>";
              echo "<button class='accion-button'>Descargar QR</button>";
              echo "<button class='accion-button' onclick='editarHerramienta(this)'>Editar</button>";
              echo "<button class='accion-button'>Eliminar</button>";
              echo "</td>";
              echo "</tr>";
            }
          }
          $conexion->close();
          ?>
        </tbody>
      </table>
    </section>
    <div id="overlay" onclick="cerrarSiEsFuera(event, 'popup')"></div>
    <div id="popup">
      <form id="editarHerramientaForm">
          <h3>Editar datos</h3>

          <div class="field">
             <Label>Foto</Label>
              <img id="editFoto" src="" alt="Foto de la herramienta" />
              <input type="file" id="editFotoInput" onchange="actualizarFoto(event)">
          </div>

          <div class="field">
              <label for="editUsuario">Usuario:</label>
              <input type="text" id="editUsuario">
          </div>

          <div class="field">
              <label for="editTipoherramienta">Tipo:</label>
              <input type="text" id="editTipoherramienta" placeholder="Tipo de">
          </div>

          <div class="field">
              <label for="editMarca">Marca:</label>
              <input type="text" id="editMarca" placeholder="Marca">
          </div>

          <div class="field">
              <label for="editTamano">Tamaño:</label>
              <input type="text" id="editTamano" placeholder="Tamaño">
          </div>

          <div class="field">
              <label for="editOrdenCompra">Orden de compra:</label>
              <input type="text" id="editOrdenCompra" placeholder="Orden de compra">
          </div>

          <div class="field">
              <label for="editNoSerie">Número de serie:</label>
              <input type="text" id="editNoSerie" name="noSerie" />
          </div>

          <div class="field">
              <label for="editEstado">Estado:</label>
              <select id="editEstado">
                  <option value="bueno">Bueno</option>
                  <option value="regular">Regular</option>
                  <option value="malo">Malo</option>
              </select>
          </div>

          <div class="field">
              <label for="editColor">Color:</label>
              <input type="text" id="editColor" placeholder="Color">
          </div>

          <div class="field">
              <label for="editFecha">Fecha:</label>
              <input type="date" id="editFecha">
          </div>

          <div class="field">
              <label for="editEstatus">Estatus:</label>
              <select id="editEstatus">
                  <option value="prestado">Prestado</option>
                  <option value="devuelto">Devuelto</option>
              </select>
          </div>

          <button type="submit" class="guardar">Guardar</button>
          <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popup')">Cancelar</button>
      </form>
    </div>
  </div>


  <script src="js/scriptnavegacion.js"></script>
  <script src="js/tablaHistorial.js"></script>
  <script src="js/popup.js"></script>
</body>
</html>




