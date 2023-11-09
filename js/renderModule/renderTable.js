import { renderDelete } from "./renderDelete.js";

const elementDOM = {
    containerTable: '#renderTable',
}

const renderContainer = document.querySelector(elementDOM.containerTable);

//Todos los parametros que estoy recibiendo son arrays
export const renderElementDom = (elementArray, valueName, valueState) => {
    let count = 0;
    renderContainer.textContent = ''; //Limpiando el contenedor

    elementArray.forEach(elementIDs => {
        const newContainerIDs = document.createElement('div');
        const newRowElement = document.createElement('tr');

        //Creando los elemento th en donde se va a visualizar los valores
        const newValueElementIDs = document.createElement('td');
        newValueElementIDs.classList.add('valueIDs');

        const newValueElementName = document.createElement('td');
        const newValueElementState = document.createElement('td');
        const newValueElementAcciont = document.createElement('td');
        const createButtonDelete = document.createElement('button');
        createButtonDelete.className = "delete-button";
        createButtonDelete.innerText = 'Eliminar herramienta';
        createButtonDelete.id = 'deleteElementsDOM';

        //Agregando los valores a los elementos th
        newValueElementIDs.textContent = elementIDs;
        newValueElementName.innerText = valueName[count];
        newValueElementState.innerText = valueState[count];
        newValueElementAcciont.appendChild(createButtonDelete);

        //Agregando los elementos semanticamente
        newContainerIDs.appendChild(newRowElement);
        newRowElement.append(newValueElementIDs, newValueElementName, newValueElementState, newValueElementAcciont);

        renderContainer.appendChild(newContainerIDs);
        count++;
    });

    renderDelete();
}