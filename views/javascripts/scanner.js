async function onScanSuccess(decodedText, decodedResult){
    console.log(`Code Mathched`)
}

async function onScanFailure(error){
  console.log(error);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
    "reader",
    { fps: 10, qrbox: { width: 250, height: 250 } },
    false
)
html5QrcodeScanner.render(onScanSuccess, onScanFaliure)