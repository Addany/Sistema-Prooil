function cancelDelivery() {
    document.getElementById("deliveryForm").reset();
}

document.getElementById("deliveryForm").addEventListener("submit", function (event) {
    event.preventDefault();

    cancelDelivery();

    Swal.fire('Éxito', 'Entrega solicitada con éxito.', 'success');
});

function onEPPSelected(eppInfo) {
    var eppList = document.getElementById("eppList");
    if (eppInfo === "") return;

    var eppData = JSON.parse(eppInfo);
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

    // Resetear el valor del select
    eppList.value = "";
    $('.eppList').select2().trigger('change');
}

function removeRow(btn) {
    var row = btn.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
