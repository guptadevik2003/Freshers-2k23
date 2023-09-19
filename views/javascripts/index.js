async function showMenu() {
    var showIcon = document.getElementById('showMenu')
    var hideIcon = document.getElementById('hideMenu')
    showIcon.style.display = 'none'
    hideIcon.style.display = 'block'
}
async function hideMenu() {
    var showIcon = document.getElementById('showMenu')
    var hideIcon = document.getElementById('hideMenu')
    showIcon.style.display = 'block'
    hideIcon.style.display = 'none'
}

let submitBtn = document.getElementById('submit')

document.getElementById('contactForm').addEventListener('submit', async(e) => {
    e.preventDefault()
    const { name, email, message } = Object.fromEntries(new FormData(e.target).entries())

    const fetchData = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(data => { return data })
    if(fetchData.success){
        submitBtn.value = "Submitted"
    }
    else{
        submitBtn.value = "Error"
    }
})
