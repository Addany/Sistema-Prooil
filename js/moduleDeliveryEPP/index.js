import { collectingInformationDOM } from "./collectingInformation.js";
import { consumingPromiseData } from "./consumingPromise.js";
import { clearFieldData } from "./fieldDelete.js";
import { windowFolioDOM } from "./windowNumerFolio.js";


const elementDOM = {
    selectDropdownList: '#eppList',
    selectPersonList: '#personSelect',
    containerRenderTbody: '#render-elements-tool',
    buttonDeleteGlobal: '#deleteData',
    containerTextObs: '#observations',
    firstElementList: '#firstElement',
    secondElementList: '#secondElement',
    buttonConfirmloan: '#confirmData',
    labelNameStorer: '#nameStorer',
}

const selectDropdown = document.querySelector(elementDOM.selectDropdownList);
const selectDropdownPerson = document.querySelector(elementDOM.selectPersonList);
const selectRenderBodyTable = document.querySelector(elementDOM.containerRenderTbody);
const selectButtonDelete = document.querySelector(elementDOM.buttonDeleteGlobal);
const selectContainerText = document.querySelector(elementDOM.containerTextObs);
const selectFirstList = document.querySelector(elementDOM.firstElementList);
const selectSecondList = document.querySelector(elementDOM.secondElementList);
const selectButtonConfirmloan = document.querySelector(elementDOM.buttonConfirmloan);
const selectStorer = document.querySelector(elementDOM.labelNameStorer);

selectDropdown.addEventListener('change', ()=> {
    consumingPromiseData( selectDropdown.value, selectRenderBodyTable );
});

selectButtonDelete.addEventListener('click', ()=> {
    clearFieldData( selectFirstList, selectSecondList, selectRenderBodyTable, selectContainerText );
})

selectButtonConfirmloan.addEventListener('click', ()=> {
    const informationloan = collectingInformationDOM( selectStorer, selectDropdownPerson, selectContainerText );
    
    if(typeof informationloan == 'undefined') return;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', './php/registroEPP.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    const dataJSON = JSON.stringify(informationloan);
    //console.log(dataJSON)

    xhr.onload = ()=> {
        if(xhr.status === 200) {
            let responseObject = JSON.parse(xhr.responseText);
            windowFolioDOM(responseObject);
        } else {
            console.log(xhr.responseText);
            console.log("Error al enviar la solicitud");
        }
    }
    
    xhr.send(dataJSON);

    clearFieldData( selectFirstList, selectSecondList, selectRenderBodyTable, selectContainerText );
    setInterval("location.reload()",1500);
});