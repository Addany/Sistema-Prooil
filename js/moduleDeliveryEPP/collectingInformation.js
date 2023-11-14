import { arrayToolIDs } from "./renderBodyTable.js";

export const arrayAmountTools = [];

export const collectingInformationDOM = (selectStorer, selectDropdownPerson, selectContainerText) => {
    if(arrayToolIDs.length === 0) return;
    if(!selectDropdownPerson.value) return;

    const selectValueParagraph = document.querySelectorAll('.counterTools');

    selectValueParagraph.forEach( element => {
        arrayAmountTools.push(element.textContent);
    });

    return {
        storerName: selectStorer.textContent, //Nombre del alamcenista
        applicantName: selectDropdownPerson.value, //Nombre del solicitante
        containerObservation: selectContainerText.value, //Descripcion de las observaciones 
        toolsIDs: [...arrayToolIDs], //Array que contiene todos los IDs de las herramientas
        amountTools: [...arrayAmountTools], //Array que contiene la cantidad de herramientas solicitadas
    }
}