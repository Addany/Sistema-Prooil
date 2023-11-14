import { arrayAmountTools } from "./collectingInformation.js";
import { arrayToolIDs } from "./renderBodyTable.js";

export const clearFieldData = ( dropdownTools, dropdownPerson, bodyTable, containerText ) => {
    arrayToolIDs.length = 0;
    arrayAmountTools.length = 0;
    
    dropdownTools.removeAttribute('selected');
    dropdownPerson.removeAttribute('selected');

    dropdownTools.setAttribute('selected', 'selected');
    dropdownPerson.setAttribute('selected', 'selected');

    bodyTable.textContent = '';
    containerText.value = '';
}