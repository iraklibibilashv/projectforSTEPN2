let main = document.querySelector(`main`);
let id = window.location.search.split("=")[1]

fetch(`https://rentcar.stepprojects.ge/api/Car/id/${id}`)
.then(resp => resp.json())
.then(data => {
    console.log(data);
    
})
