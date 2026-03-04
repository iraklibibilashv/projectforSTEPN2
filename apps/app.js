let main = document.querySelector(`#main`)
let mainContent = document.querySelector(`#mainContent`)
let selectLocation = document.querySelector(`#location`)
let searchButton = document.querySelector(`#search`)




fetch(`https://rentcar.stepprojects.ge/api/Car`)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    data.forEach(el => {
        selectLocation.innerHTML += `<option value="${el.id}">${el.city}</option>`
        
    });

    
})