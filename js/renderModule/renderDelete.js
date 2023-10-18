import { readerCode } from "./scanCamera.js";
import { renderElementDom } from "./renderTable.js";

const elementsDOM = {
    selectButtonDelete: '#deleteElementsDOM',
    containerTable: '#renderTable',
}

const renderContainer = document.querySelector(elementsDOM.containerTable);

export const renderDelete = () => { 
    const selectButtonDelete = document.querySelectorAll(elementsDOM.selectButtonDelete); //Esto es un array

    selectButtonDelete.forEach( element => {     
        element.addEventListener('click', () => {   
            //Selecciona el elemento padre del elemento padre del elemento que se le dio click 
            const arrowtable = element.parentNode.parentNode; 
            const firstArrow = arrowtable.querySelector('th');
            let elementDelete = firstArrow.textContent;
            let indexElementDelete = readerCode.firstCode.indexOf(elementDelete);

            if(indexElementDelete !== -1) {
                readerCode.firstCode.splice(indexElementDelete, 1); //Elimina el elemento del array
                readerCode.nameTools.splice(indexElementDelete, 1); //Elimina el elemento del array
                readerCode.stateTools.splice(indexElementDelete, 1); //Elimina el elemento del array

                renderElementDom(readerCode.firstCode, readerCode.nameTools, readerCode.stateTools); //Manda a llamar la funcion que renderiza los elementos
            }
        });
    });
}

//Se encarga de limpiar el contenedor y los arrays al momento de dar click en el boton de limpiar campo
export const clearContainerAll = (firstCode, nameTools, stateTools) => { 
    firstCode.length = 0; //Limpiando el array
    nameTools.length = 0; //Limpiando el array
    stateTools.length = 0; //Limpiando el array

    renderContainer.textContent = ''; //Limpiando el contenedor
}
