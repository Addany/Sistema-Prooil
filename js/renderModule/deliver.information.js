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

/**
 * 
 * @param {Array} elementsIDs 
 * @param {ElememtHTML} nameStorer 
 * @param {ElementHTML} nameApplicant 
 * @param {ElementHTML} observation 
 * @returns {Object}
 */

const returnInformationLoan = ( elementsIDs, nameStorer, nameApplicant, observation) => {
    return {
        arrayIDs: elementsIDs,
        textNameStorer: nameStorer.textContent,
        textNameApplicant: nameApplicant.value,
        textObservation: observation.value,
    }
}

buttomConfirm.addEventListener('click', ()=> {
    const objectInformation = returnInformationLoan(readerCode.firstCode, labelStorerName, labelApplicantName, observationLoan);
    
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
            console.log(xhr.responseText);
        } else {
            console.log(xhr.responseText);
            console.log("Error al enviar la solicitud");
        }
    }

    xhr.send(dataJSON);
});