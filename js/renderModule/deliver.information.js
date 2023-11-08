import { clearContainerAll } from "./renderDelete.js";
import { readerCode } from "./scanCamera.js"; //Importando el objeto que contiene los codigos leidos por la camara

const elementDOM = { //IDs de los elementos del DOM que se van a utilizar
    buttomConfirm: '#confirmData',
    nameStorer: '#nameAlmacenista',
    nameApplicant: '#workerName',
    observation: '#observations',
}

//Obteniendo refrerencias de los elementos del DOM
const buttomConfirm = document.querySelector(elementDOM.buttomConfirm);
const labelStorerName = document.querySelector(elementDOM.nameStorer);
const labelApplicantName = document.querySelector(elementDOM.nameApplicant);
const observationLoan = document.querySelector(elementDOM.observation);
const selectBodyHTML = document.querySelector('body');

/**
 * 
 * @param {Array} elementsIDs 
 * @param {ElememtHTML} nameStorer 
 * @param {ElementHTML} nameApplicant 
 * @param {ElementHTML} observation 
 * @returns {Object}
 */

const returnInformationLoan = ( elementsIDs, nameStorer, nameApplicant, observation) => {
    console.log(elementsIDs, nameStorer, nameApplicant, observation)
    if(elementsIDs.length === 0) {
        alert('No se ha escaneado ningun codigo QR');
        return;
    };
    if( !nameStorer.textContent || !nameApplicant.value) {
        alert('Rellene Todos los campos')
        return;
    }

    return {
        arrayIDs: elementsIDs,
        textNameStorer: nameStorer.textContent,
        textNameApplicant: nameApplicant.value,
        textObservation: observation.value,
    }
}

const createWindowNumFolio = ( numFolio ) => {
    const createDivElement = document.createElement('div');
    createDivElement.setAttribute('class', 'container-windowFolio');
    createDivElement.removeAttribute('container-windowFolio-none')

    const createParagraphElement = document.createElement('p');
    createParagraphElement.innerText = numFolio.folio;

    const createButtonElement = document.createElement('button');
    createButtonElement.innerText = 'Aceptar';

    createButtonElement.addEventListener('click', ()=> {
        createDivElement.setAttribute('class', 'container-windowFolio-none');
    })

    createDivElement.append(createParagraphElement, createButtonElement);
    selectBodyHTML.append(createDivElement);
} 

buttomConfirm.addEventListener('click', ()=> {
    const objectInformation = returnInformationLoan(readerCode.firstCode, labelStorerName, labelApplicantName, observationLoan);

    console.log(objectInformation)
    if(typeof objectInformation == 'undefined') {
        console.log('Puta madre rellena la solicitud')
        return;
    }
    
    //Aqui estoy creando una nueva instancia de la clase XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //Aqui estoy configurando la solicitud 
    xhr.open('POST', './php/getData2.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    //Aqui estoy convirtiendo los datos en formato JSON antes de enviarlos 
    const dataJSON = JSON.stringify(objectInformation);
    console.log(dataJSON);

    //Aqui estoy configurando la funcion de devolucion de llamada para la respuesta del servidor 
    xhr.onload = ()=> {
        if(xhr.status === 200) {
            let responseObject = JSON.parse(xhr.responseText);
            createWindowNumFolio(responseObject);
        } else {
            console.log(xhr.responseText, 'wola');
            console.log("Error al enviar la solicitud");
        }
    }

    xhr.send(dataJSON);

    clearContainerAll(readerCode.firstCode, readerCode.nameTools, readerCode.stateTools);
});