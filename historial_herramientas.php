<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial del Almacén</title>
  <link rel="stylesheet" href="css/estilosalmacen.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>

  <div id="page-container">
    <div id="navbar"></div>
    
    <script>
      $('#navbar').load('Navegacion/navbar.php', function() {
        $.getScript("Navegacion/navbar.js", function() {
          $('#page-container').fadeIn();
        });
      });
    </script>

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
            <th>Descripción</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <!-- Aquí se insertarán las filas -->
        </tbody>
      </table>
    </section>

      <div id="overlay"></div>
      <div id="popup">
        <form id="editarHerramientaForm">
            <h3>Editar datos</h3>
            <img id="editFoto" src="" alt="Foto del herramienta" />
                <input type="file" id="editFotoInput" onchange="actualizarFoto(event)">
            <input type="hidden" id="editId">
            <input type="text" id="editTipoherramienta" placeholder="Tipo de">
            <input type="text" id="editMarca" placeholder="Marca">
            <input type="text" id="editTamano" placeholder="Tamaño">
            <input type="text" id="editOrdenCompra" placeholder="Orden de compra">
            <input type="text" id="editNoSerie" name="noSerie" />
            <input type="text" id="editEstado" placeholder="Estado">
            <input type="text" id="editColor" placeholder="Color">
            <input type="date" id="editFecha">
            <input type="text" id="editDescripcion" placeholder="Descripción">
            <input type="text" id="editEstatus" placeholder="Estatus">
            <button type="submit" class="guardar">Guardar</button>
            <button id="cancelarEdicion">Cancelar</button>
        </form>
      </div>
  </div>

  <script src="js/ScriptsHistorialHerramientas/domHelpers.js"></script>
  <script src="js/ScriptsHistorialHerramientas/helpers.js"></script>
  <script src="js/ScriptsHistorialHerramientas/tablaHistorial.js"></script>
  <script src="js/ScriptsHistorialHerramientas/popup.js"></script>
  <script src="js/ScriptsHistorialHerramientas/data.js"></script>
  <script src="js/ScriptsHistorialHerramientas/main.js"></script>
</body>
</html>




