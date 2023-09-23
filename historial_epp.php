<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de EPP</title>
  <link rel="stylesheet" href="css/estiloshistorialEPP.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>

  <div id="page-container">
    <main>
      <div id="navbar"></div>
      
      <script>
        $('#navbar').load('Navegacion/navbar.html', function() {
          $.getScript("Navegacion/navbar.js", function() {
            $('#page-container').fadeIn();
          });
        });
      </script>

        <section class="container">
          <div class="form-container">
            <form class="form-buscar">
              <div class="input-group">
                <label for="buscador">Busqueda por texto:</label>
                <input type="text" id="buscador" placeholder="Buscar por texto o ID" oninput="buscar()">
              </div>
              <div class="input-group">
                <label for="fechaInicio">Fecha Inicio:</label>
                <input type="date" id="fechaInicio" onchange="buscar()">
              </div>
              <div class="input-group">
                <label for="fechaFin">Fecha Fin:</label>
                <input type="date" id="fechaFin" onchange="buscar()">
              </div>
              <div class="input-group">
                <label for="categoria">Categoria:</label>
                <select id="categoria" onchange="buscar()">
                  <option value="todos">Todos</option>
                  <option value="casco contra impacto">Casco contra impacto</option>
                  <option value="capucha">Capucha</option>
                </select>
                <button type="button" id="eliminarBusqueda" onclick="buscar()">Limpiar busqueda</button>
              </div>
            </form>
          </div>
          <table id="tabla-historial">
            <thead>
              <tr>
                <th>Foto</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cantidad</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Tipo</th>
                <th>Clase</th>
                <th>Talla</th>
                <th>Orden de compra</th>
                <th>Fecha de registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <!-- Aquí se insertarán las filas -->
            </tbody>
          </table>
        </section>
      </main>

      <div id="overlay"></div>
      <div id="popup">
          <form id="editarHerramientaForm">
            <h3>Editar datos</h3>
              <img id="editFoto" src="" alt="Foto del EPP" />
                <input type="file" id="editFotoInput" onchange="actualizarFoto(event)">
              <input type="text" id="editId" placeholder="ID">
              <input type="text" id="editNombre" placeholder="Nombre" >
              <input type="text" id="editCantidad" placeholder="Cantidad" >
              <input type="text" id="editMarca" placeholder="Marca">
              <input type="text" id="editModelo" placeholder="Modelo">
              <input type="text" id="editTipo" placeholder="Tipo" >
              <input type="text" id="editClase" placeholder="Clase" >
              <input type="text" id="editTalla" placeholder="Talla" >
              <input type="text" id="editOrdenCompra" placeholder="Orden de Compra" >
              <input type="date" id="editFechaRegistro" placeholder="Fecha de Registro" >
              <button type="submit" class="guardar">Guardar</button>
              <button id="cancelarEdicion">Cancelar</button>
          </form>
      </div>
  </div>


  <script src="js/ScriptsHistorialEPP/domHelpers.js"></script>
  <script src="js/ScriptsHistorialEPP/helpers.js"></script>
  <script src="js/ScriptsHistorialEPP/tablaHistorial.js"></script>
  <script src="js/ScriptsHistorialEPP/popup.js"></script>
  <script src="js/ScriptsHistorialEPP/data.js"></script>
  <script src="js/ScriptsHistorialEPP/main.js"></script>
</body>
</html>




