<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Historial de EPP</title>
  <link rel="stylesheet" href="css/estiloshistorialEPP.css">
  <link rel="stylesheet" href="css/navbar.css">
  <link rel="icon" href="Resources/Icons/EPP.ico">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
  <?php
  include 'php/session.php';
  ?>

  <div id="page-container">
    <main>
      <div id="navbar"></div>
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
                <th>Clase</th>
                <th>Talla</th>
                <th>Orden de compra</th>
                <th>Fecha de registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Foto"><img src="Resources/Imagen1.webp" alt="Foto de " class="imagen-epp" /></td>
                <td data-label="ID">1234</td>
                <td data-label="Nombre">Casco</td>
                <td data-label="Cantidad">3</td>
                <td data-label="Marca">3M</td>
                <td data-label="Modelo">3M-HALMET2123</td>
                <td data-label="Clase">Clasex</td>
                <td data-label="Talla">Unitalla</td>
                <td data-label="Orden de compra">12388123</td>
                <td data-label="Fecha de Registro">20-02-2021</td>
                <td data-label="Acciones">
                    <button class="accion-button" onclick="generarReporte('${item.id}')">Generar reporte</button>
                    <button class="accion-button" onclick="editarEPP(this)">Editar</button>
                    <button class="accion-button" onclick="eliminarEPP('${item.id}')">Eliminar</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <div id="overlay" onclick="cerrarSiEsFuera(event, 'popup')"></div>
      <div id="popup">
        <form id="editarEPP">
            <h3>Editar datos</h3>
            
            <div class="field">
                <label for="">Foto:</label>
                <img id="editFoto" src="" alt="Foto del EPP" />
                <input type="file" id="editFotoInput" onchange="actualizarFoto(event)">
            </div>

            <div class="field">
                <label for="editId">ID:</label>
                <input type="text" id="editId" placeholder="ID">
            </div>

            <div class="field">
                <label for="editNombre">Nombre:</label>
                <input type="text" id="editNombre" placeholder="Nombre">
            </div>

            <div class="field">
                <label for="editCantidad">Cantidad:</label>
                <input type="text" id="editCantidad" placeholder="Cantidad">
            </div>

            <div class="field">
                <label for="editMarca">Marca:</label>
                <input type="text" id="editMarca" placeholder="Marca">
            </div>

            <div class="field">
                <label for="editModelo">Modelo:</label>
                <input type="text" id="editModelo" placeholder="Modelo">
            </div>

            <div class="field">
                <label for="editTipo">Tipo:</label>
                <input type="text" id="editTipo" placeholder="Tipo">
            </div>

            <div class="field">
                <label for="editClase">Clase:</label>
                <input type="text" id="editClase" placeholder="Clase">
            </div>

            <div class="field">
                <label for="editTalla">Talla:</label>
                <input type="text" id="editTalla" placeholder="Talla">
            </div>

            <div class="field">
                <label for="editOrdenCompra">Orden de Compra:</label>
                <input type="text" id="editOrdenCompra" placeholder="Orden de Compra">
            </div>

            <div class="field">
                <label for="editFechaRegistro">Fecha de Registro:</label>
                <input type="date" id="editFechaRegistro" placeholder="Fecha de Registro">
            </div>

            <button type="submit" class="guardar">Guardar</button>
            <button type="button" id="cancelarEdicion" onclick="cerrarPopup('popup')">Cancelar</button>
        </form>
    </div>
  </div>


  <script src="js/scriptnavegacion.js"></script>
  <script src="js/ScriptsHistorialEPP/tablaHistorial.js"></script>
  <script src="js/ScriptsHistorialEPP/popup.js"></script>
</body>
</html>




