function descargarQR(identificador) {
    var url = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + identificador;
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'herramienta' + identificador + '.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
    .catch(error => console.error('Error fetching QR code:', error));
}
