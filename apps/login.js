let loginBtn = document.querySelector(`#loginBtn`)
loginBtn.addEventListener("click",() => {
    let user = {
        phoneNumber : document.querySelector(`#phoneNumber`).value,
        password : document.querySelector(`#password`).value,
    }
    fetch(`https://rentcar.stepprojects.ge/api/Users/login`, {
        method : `POST`,
        headers:{"Content-Type": `application/json`},
        body: JSON.stringify(user)
    })
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
        localStorage.setItem(`user`,JSON.stringify(data))
        alert(`Log in Succesfull`)
        window.location.href = `./index.html`
        
    })
    .catch(err => {
        console.error(err)
        alert(`Somethins Wrong`)
    })
})

