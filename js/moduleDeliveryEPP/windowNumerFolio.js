export const windowFolioDOM = ( folioIDs ) => {
    if(typeof folioIDs.folio == 'undefined') return;

    const selectBodyElement = document.querySelector('body');
    const createDivElement = document.createElement('div');
    const createSpanElement = document.createElement('span');
    const createButtonAccept = document.createElement('button');

    createDivElement.setAttribute('class', 'container-numberFolio');
    createDivElement.style.display = 'flex';
    createButtonAccept.setAttribute('id', 'accept-folio');

    createSpanElement.innerHTML = `El numero de folio es el siguiente: <strong>${folioIDs.folio}</strong>`;
    createButtonAccept.innerText = 'Aceptar';
    
    createDivElement.append( createSpanElement, createButtonAccept );
    selectBodyElement.append( createDivElement );

    const displayNoneContainer = () => {
        if(createDivElement.style.display == 'flex') {
            createDivElement.style.display = 'none';
        }
    }

    createButtonAccept.addEventListener('click', ()=> displayNoneContainer());
}