export let arrayToolIDs = [];

const buttonSumNext = ( paragraph, buttonParent ) => {
    const fatherElement = buttonParent.parentNode.parentNode;
    const childElement = fatherElement.querySelector('td'); //Cantidad disponible
    let amountElements = parseInt(paragraph.textContent)

    if(amountElements >= childElement.textContent) return;
    paragraph.textContent = ++amountElements;
}

const buttonSubPrev = ( paragraph ) => {
    let amountElements = parseInt(paragraph.textContent)

    if(paragraph.textContent == 1) return;
    paragraph.textContent = --amountElements;
}

const deleteElementHTML = ( arrayIDS ) => {
    const selectDeleteFater = document.querySelector(`.prefix${arrayIDS}`);
    const elementIDX = arrayToolIDs.indexOf(arrayIDS);
    arrayToolIDs.splice(elementIDX, 1);
    selectDeleteFater.remove();
}

export const renderBodyTable = ( elementRender, arrayIDS, ...arrayElements ) => {
    if(arrayToolIDs.includes( arrayIDS ) || isNaN(arrayIDS)) return;

    arrayToolIDs.push(arrayIDS);

    const createTableRow = document.createElement('tr');
    const createElementOneTH = document.createElement('td');
    const createElementTwoTH = document.createElement('td');
    const createButtoPrev = document.createElement('button');
    const createButtonNext = document.createElement('button');
    const createParagraph = document.createElement('p');
    const createButtonDelete = document.createElement('button');

    createButtoPrev.id = 'button-prev-id';
    createButtonNext.id = 'button-next-id';
    createButtonDelete.id = 'button-delete-id';

    createParagraph.setAttribute('class', 'counterTools');
    createButtoPrev.setAttribute('type', 'button');
    createButtonNext.setAttribute('type', 'button');
    createButtonDelete.setAttribute('type', 'button');
    createButtonDelete.setAttribute('class', `${arrayIDS}`);
    createTableRow.setAttribute('class', `prefix${arrayIDS}`);
    createElementOneTH.setAttribute('class', 'container-countTools');

    createButtoPrev.innerText = '-';
    createButtonNext.innerText = '+';
    createButtonDelete.innerText = 'Eliminar';
    createParagraph.textContent = '1';

    createElementOneTH.append(createButtoPrev, createParagraph, createButtonNext);
    createElementTwoTH.append(createButtonDelete);

    arrayElements.forEach( (elements) => {
        const createElementTH = document.createElement('td');
        createElementTH.setAttribute('class', `prefix${arrayIDS}`);
        createElementTH.textContent = elements;

        createTableRow.append(createElementTH, createElementOneTH, createElementTwoTH);
    });

    elementRender.append(createTableRow);
  
    createButtonNext.addEventListener('click', ()=> buttonSumNext(createParagraph, createButtonNext));
    createButtoPrev.addEventListener('click', ()=> buttonSubPrev(createParagraph, createButtoPrev));
    createButtonDelete.addEventListener('click', ()=> deleteElementHTML(arrayIDS, createButtonDelete));
}