const selectBodyHTML = document.querySelector('body');

export const renderErrorDOM = ( code ) => {
    const createElementDiv = document.createElement('div');
    createElementDiv.setAttribute(  'class','containerWindow-existingCode');

    const createElementDivChildren = document.createElement('div');
    createElementDivChildren.setAttribute('class', 'container-textAlert');

    const createtittleError = document.createElement('h3');
    createtittleError.innerText = 'Aviso importante';
    createElementDivChildren.append(createtittleError);

    const createParagraphElement = document.createElement('p');
    createParagraphElement.innerText = `La herramienta ha sido escaneada y actualmente se encuentra en préstamo.`;

    const createElementSpan = document.createElement('p');
    createElementSpan.innerText = ` El identificador de la herramienta es el siguiente: ${code}`;

    const createButtonElement = document.createElement('button');
    createButtonElement.innerText = 'Aceptar';

    createButtonElement.addEventListener('click', ()=> {
        createElementDiv.setAttribute('class', 'container-windowFolio-none');
    })

    createElementDiv.append( createElementDivChildren, createParagraphElement, createElementSpan,createButtonElement);
    selectBodyHTML.append(createElementDiv);
}