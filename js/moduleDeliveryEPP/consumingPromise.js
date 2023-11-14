import { fetchEPPData } from "./petitionServer.js";
import { renderBodyTable } from "./renderBodyTable.js";

export const consumingPromiseData = async( valueElementHTML, elementRender ) => {
    try {
        const { 
            cantidad: toolQuantity, 
            nombre_epp: toolName,
            clase: toolClass, 
            marca: toolBrand, 
            modelo: toolModel,
            talla: toolSize,
            id_epp: toolID
        } = await fetchEPPData( valueElementHTML );

        renderBodyTable(elementRender, toolID,parseInt(toolQuantity), toolName, toolClass, toolBrand, toolModel, toolSize);
    } catch(err) {
        return err;
    }
}