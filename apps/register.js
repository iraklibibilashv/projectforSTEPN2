let registerBtn = document.querySelector(`#registerBtn`)
registerBtn.addEventListener("click",() => {
    let user = {
        firstName: document.querySelector(`#firstName`).value,
        lastName: document.querySelector(`#lastName`).value,
        email: document.querySelector(`#email`).value,
        phoneNumber: document.querySelector(`#phoneNumber`).value,
        password : document.querySelector(`#password`).value,
        role : `user`
    }

fetch(`https://rentcar.stepprojects.ge/api/Users/register`, {
    method: `POST`,
    headers: {"Content-Type": `application/json`},
    body: JSON.stringify(user)
})
.then(resp => resp.json())
.then(data => {
    console.log(data)
    alert(`Registration Succesfull`);
    window.location.href = `./login.html`
    
})
.catch(err => {
    console.error(err)
    alert(`Somethings Wrong`)
})
})