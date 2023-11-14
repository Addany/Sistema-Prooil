export const fetchEPPData = async(id) => {
    try {
        const response = await fetch('./php/getDataEPP.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'id=' + id
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const textResponse = await response.text();
        
        try {
            const data = JSON.parse(textResponse);
            return data;
        } catch (error) {
            console.error('Error al analizar JSON:', error);
        }
    } catch (error) {
        console.error('Hubo un problema con la petición fetch: ' + error.message);
    }
}