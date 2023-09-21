// async function onScanSuccess(decodedText){
//     await fetch('/admin/scanner/post', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//             Base64String: decodedText
//         })
//     })
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//         window.alert(data)
//         html5QrcodeScanner.stop()
//     })
// }

// async function onScanFailure(error){
//     console.log(error);
// }
async function successCallback(decodedText, decodedResult){
    await stopScanner()
    await fetch('/admin/scanner/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            Base64String: decodedText
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.success){

            window.alert(`${data.data.fullName} Registered!`)

        } else {

            if(data.message === 'wrong_url_entered'){
                window.alert('Wrong QR Scanned!')
            }
            if(data.message === 'student_not_found'){
                window.alert('Student Not Found!')
            }
            if(data.message === 'already_registered'){
                window.alert(`User Already Registered!`)
            }

        }
    })

    await startScanner()
}

async function errorCallback(errorMessage){
    console.log(errorMessage)
}

async function startScanner(){
    await html5QrCode.start(
        cameraId,
        { fps: 10 },
        successCallback,
        errorCallback
    )
}

async function stopScanner(){
    await html5QrCode.stop()
}

async function mainFunction(){
    await Html5Qrcode.getCameras().then(devices => {
        if(devices && devices.length){
            cameraId = devices[0].id
        }
    })
    .catch(err => window.alert(err))
    
    if(cameraId === undefined) return window.alert('Camera Permission Denied!')
    
    await startScanner()
}
                        
let cameraId = undefined
const html5QrCode = new Html5Qrcode('reader')

mainFunction()
