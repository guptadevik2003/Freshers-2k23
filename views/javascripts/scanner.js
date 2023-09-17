async function onScanSuccess(decodedText, decodedResult){
    window.alert(decodedText)
}

async function onScanFailure(error){
    console.log(error);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 800, height: 800 } },
    false
)
html5QrcodeScanner.render(onScanSuccess, onScanFailure)