<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de herramientas</title>
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
        <input type="text" id="buscador" placeholder="Tipo de herramienta, Marca, etc.">
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
        <button type="button" id="eliminarBusqueda">Limpiar Búsqueda</button>
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
          $sql = "SELECT herramientas_cantidad.*, herramientas.tipo_herramienta, herramientas.foto FROM herramientas_cantidad JOIN herramientas_tipo ON herramientas_cantidad.identificador = herramientas_tipo.identificador JOIN herramientas ON herramientas_tipo.id_herramienta = herramientas.id_herramienta;";
          $result = $conexion->query($sql);

          if ($result->num_rows > 0){
            while ($row = $result->fetch_assoc()) {
              $foto = isset($row['foto']) && $row['foto'] != "" ? "data:image/jpeg;base64," . base64_encode($row['foto']) : 'Resources/Imagen1.webp';
              $fechaObj = date_create_from_format('Y-m-d', $row["fecha_registro"]);
              $fechaFormateada = $fechaObj->format('d/m/Y');
              echo "<tr>";
              echo "<td data-label='Foto'><img src='" . $foto . "' alt='Foto de' class='imagen-herramienta'></td>";
              echo "<td data-label='ID'>" . $row["identificador"] . "</td>";
              echo "<td data-label='Tipo de herramienta'>" . $row["tipo_herramienta"] . "</td>";
              echo "<td data-label='Marca'>" . $row["marca"] . "</td>";
              echo "<td data-label='Orden de compra'>" . $row["orden_compra"] . "</td>";
              echo "<td data-label='Tamaño'>" . $row["tamaño"] . "cm</td>";
              echo "<td data-label='No. Serie'>" . $row["no_serie"] . "</td>";
              echo "<td data-label='Estado'>" . $row["estado"] . "</td>";
              echo "<td data-label='Color'>" . $row["color"] . "</td>";
              echo "<td data-label='Fecha de Registro'>" . $fechaFormateada . "</td>";
              echo "<td data-label='Estatus'>" . $row["disponibilidad"] . "</td>";
              echo "<td data-label='Acciones'>";
              echo "<button class='accion-button'>Descargar QR</button>";
              echo "<button class='accion-button' onclick='editarHerramienta(this)'>Editar</button>";
              echo "<button class='accion-button' onclick='intentarEliminar(this)'>Eliminar</button>";
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
              <label for="editTipoherramienta">Tipo de Herramienta:</label>
              <input type="text" id="editTipoherramienta" placeholder="Tipo de">
          </div>

          <div class="field">
              <label for="editMarca">Marca:</label>
              <input type="text" id="editMarca" placeholder="Marca">
          </div>

          <div class="field">
              <label for="editOrdenCompra">Orden de compra:</label>
              <input type="text" id="editOrdenCompra" placeholder="Orden de compra">
          </div>

          <div class="field">
              <label for="editTamano">Tamaño:</label>
              <input type="text" id="editTamano" placeholder="Tamaño">
          </div>

          <div class="field">
              <label for="editNoSerie">No. serie:</label>
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
              <label for="editFecha">Fecha de Registro:</label>
              <input type="date" id="editFecha">
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




