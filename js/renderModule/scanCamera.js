import { clearContainerAll } from "./renderDelete.js";
import { renderElementDom } from "./renderTable.js";
import { renderErrorDOM } from "./errorRendering.js";

export const readerCode = (()=> { //Hecho por Jesus Rosml
    'use strict';

    const elementDOM = {
        camera: '#preview',
        buttonClearAll: '#clearField',
        containerTable: '#renderTable',
    }
    const selectCamera = document.querySelector(elementDOM.camera);
    const selectButtonClearAll = document.querySelector(elementDOM.buttonClearAll);
    let scanner = new Instascan.Scanner({
        video: selectCamera,
        mirror: false,
        backgroundScan: false,
        captureImage: false,
        scanPeriod: 1,
        videoConstraints: {
            width: { ideal: 256 },
            height: { ideal: 144 },
            facingMode: "environment"
        }
    });
    let firstCode = []; //Array con todos los codigos QR que ya fueron escaneados 
    let nameTools = []; //Array con los nombres de las herramientas escaneadas
    let stateTools = []; //Array con los estados de las herramientas escaneadas
    
    selectButtonClearAll.addEventListener('click', ()=> {
       clearContainerAll(firstCode, nameTools, stateTools);
    });

    scanner.addListener("scan", (content)=> {
        if(!firstCode.includes(content)) {
            
            $.ajax({
                type: "POST",
                url: "php/getData.php",
                data: { code: content },
                success: function(data){
                    console.log("Respuesta del servidor:", data);
                    let toolInfo = JSON.parse(data);
                    
                    if(toolInfo.error){  // Verifica si la respuesta contiene un error
                        console.error(toolInfo.error, 'pipi');
                        return;
                    }
                    
                    if(toolInfo.alerta){  // Verifica si hay una alerta
                        renderErrorDOM( content );
                        return;
                    }
                    
                    firstCode.push(content); //Agrega el codigo QR al array
                    nameTools.push(toolInfo.marca);
                    stateTools.push(toolInfo.estado);
            
                    renderElementDom(firstCode, nameTools, stateTools) //Manda a llamar la funcion que renderiza los elementos
                },  
                error: function(error){console.error("Error al recuperar información del código QR: ", error);
                }
            });
        };
    });
    
    Instascan.Camera.getCameras()
    .then(function (cameras) {
        if (cameras.length > 0) {
        scanner.start(cameras[0]);
        } else {
        console.error("La camara no funciona");
        }
    })
    .catch(function (e) {
        console.error(e);
    });

    return {
        firstCode,
        nameTools,
        stateTools,
    }
})();