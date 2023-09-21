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
        console.log(devices)
        if(devices && devices.length){

            // Adding Options to form for device selection
            let FormContainer = document.getElementById('cameraFormContainer')
            
            let formHTML = '<form>'

            devices.forEach(device => {
                console.log(device)
                formHTML += `<input type="radio" id="${device.id}" name="${device.label}" value="${device.label}">${device.label}<br>`
            })

            formHTML += '</form>'



            FormContainer.innerHTML += formHTML

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










// function onScanSuccess(decodedText, decodedResult) {
//     // handle the scanned code as you like, for example:
//     console.log(`Code matched = ${decodedText}`, decodedResult);
// }


// let html5QrcodeScanner = new Html5QrcodeScanner(
//     "reader",
//     { fps: 10 },
//     false
// )

// html5QrcodeScanner.render(successCallback, errorCallback);