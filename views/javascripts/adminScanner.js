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

        let successModal = document.getElementById('successModal')
        let successMessage = document.getElementById('successMessage')

        successModal.style['z-index'] = 1000
        
        if(data.success){

            successMessage.innerHTML = (`${data.data.fullName} Registered!`)

        } else {

            if(data.message === 'wrong_url_entered'){
                successMessage.innerHTML = ('Wrong QR Scanned!')
            }
            if(data.message === 'student_not_found'){
                successMessage.innerHTML = ('Student Not Found!')
            }
            if(data.message === 'already_registered'){
                successMessage.innerHTML = (`User Already Registered!`)
            }

        }
    })

    document.getElementById('successButton').addEventListener('click', async (e) => {
        document.getElementById('successModal').style['z-index'] = -1000
        await startScanner()
    })
}

async function errorCallback(errorMessage){
    console.log(errorMessage)
}

async function startScanner(){
    await html5QrCode.start(
        cameraId,
        {
            fps: 10,
            qrbox: { width: 1000, height: 1000 }
        },
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
            
            let formHTML = '<h1 class="formTitle">SELECT BACK CAMERA</h1><form id="cameraForm">'
            
            devices.forEach(device => {
                console.log(device)
                formHTML += `<label class="inputLabel"><input type="radio" id="${device.id}" name="cameraIdOption" value="${device.id}">${device.label}<br><span id="inputSpan"></span></label>`
            })
            
            formHTML += '<input type="submit" class="submitBtn" value="CONFIRM"></form>'
            FormContainer.innerHTML += formHTML
            
            document.getElementById('cameraForm').addEventListener('submit', async (e) => {
                e.preventDefault()
                const { cameraIdOption } = Object.fromEntries(new FormData(e.target).entries())
                console.log(cameraIdOption)
                if(cameraIdOption){
                    cameraId = cameraIdOption
                    document.getElementById('formModal').remove()
                    await startScanner()
                }
            })

        }
    })
    .catch(err => window.alert(err))
    
    // if(cameraId === undefined) return window.alert('Camera Permission Denied!')
    
    // await startScanner()
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