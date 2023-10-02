$(document).ready(function() {
    setTimeout(function() {
        $('.eppList').select2();
        loadCache();
    }, 500);
});

document.getElementById('observations').addEventListener('input', function () {
    localStorage.setItem('observations', this.value);
});

function onEPPSelected(eppInfo) {
    var eppList = document.getElementById("eppList");
    if (eppInfo === "") return;

    var eppData = JSON.parse(eppInfo);
    addEPPToCache(eppData);

    // Resetear el valor del select
    eppList.value = "";
    $('.eppList').select2().trigger('change');
}

function addEPPToCache(eppData) {
    var cachedEPPs = JSON.parse(localStorage.getItem('cachedEPPs') || '[]');
    cachedEPPs.push(eppData);
    localStorage.setItem('cachedEPPs', JSON.stringify(cachedEPPs));
    addEPPToTable(eppData);
}

function addEPPToTable(eppData) {
    var selectedEPPTable = document.getElementById("selected-epp-table");
    var tbody = selectedEPPTable.getElementsByTagName("tbody")[0];

    var row = tbody.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = eppData.id;
    cell2.innerHTML = eppData.name;
    cell3.innerHTML = eppData.anatomicRegion;
    cell4.innerHTML = `<button class="buttonform" onclick="removeRow(this)">Eliminar</button>`;
}

function removeRow(btn) {
    var row = btn.parentNode.parentNode;
    var cell = row.getElementsByTagName('td')[0];
    var eppIdToRemove = cell.textContent;

    // Eliminar EPP del caché
    var cachedEPPs = JSON.parse(localStorage.getItem('cachedEPPs') || '[]');
    cachedEPPs = cachedEPPs.filter(epp => epp.id !== eppIdToRemove);
    localStorage.setItem('cachedEPPs', JSON.stringify(cachedEPPs));

    // Eliminar fila de la tabla
    row.parentNode.removeChild(row);
}

function cancelDelivery() {
    document.getElementById("deliveryForm").reset();
    localStorage.removeItem('observations');
    localStorage.removeItem('cachedEPPs');
    document.getElementById("selected-epp-tbody").innerHTML = ""; // Limpiar la tabla de EPP seleccionados
}

document.getElementById("deliveryForm").addEventListener("submit", function (event) {
    event.preventDefault();

    cancelDelivery();

    Swal.fire('Éxito', 'Entrega solicitada con éxito.', 'success');
});

function loadCache() {
    // Cargar las observaciones anteriores del caché
    const observations = localStorage.getItem('observations');
    if (observations) {
        document.getElementById('observations').value = observations;
    }

    // Cargar los EPP seleccionados anteriores del caché
    const cachedEPPs = JSON.parse(localStorage.getItem('cachedEPPs') || '[]');
    cachedEPPs.forEach(eppData => {
        addEPPToTable(eppData);
    });
}