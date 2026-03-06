document.addEventListener(`DOMContentLoaded` , () => {

let main = document.querySelector(`main`);
let filterBtn = document.querySelector(`#filterBtn`)
let popularGrid = document.querySelector(`#popularGrid`)


let filters = {
  capacity: ``,
  startYear: ``,
  endYear: ``,
  city: ``,
  phone: ``,
  pageIndex: 1,
  pageSize: 10,
};

fetch(`https://rentcar.stepprojects.ge/api/Car/popular`)
.then(resp => resp.json())
.then(data => {
  data.forEach(obj => {
    let car = document.createElement(`div`)
    car.innerHTML = createCard(obj)
    popularGrid.appendChild(car)
    car.addEventListener("click", () => {
      window.location.href = `./details.html?id=${obj.id}`
    })
  })
})


fetch(`https://rentcar.stepprojects.ge/api/Car/cities`)
.then(resp => resp.json())
.then(cities => {
  let select = document.querySelector(`#city`)
  cities.forEach(city => {
    let option = document.createElement(`option`)
      option.value = city
      option.textContent = city
      select.appendChild(option)

    
  })
})

function fetchCars() {

  if(filters.phone.trim()) {
    fetch(`https://rentcar.stepprojects.ge/api/Car/byPhone?phoneNumber=${filters.phone.trim()}`)
    .then(resp => resp.json())
    .then(data => {
      main.innerHTML = ``
      data.forEach((obj) => {
        let car = document.createElement(`div`)
        car.innerHTML = createCard(obj)
        main.appendChild(car)
        car.addEventListener("click",() => {
          window.location.href = `./details.html?id=${obj.id}`;
        })
      })
    })
    return;
  }
  let params = new URLSearchParams();
  if (filters.capacity.trim()) params.append(`capacity`, filters.capacity.trim());
  if (filters.startYear.trim()) params.append(`startYear`, filters.startYear.trim());
  if (filters.endYear.trim()) params.append(`endYear`, filters.endYear.trim());
  if (filters.city.trim()) params.append(`city`, filters.city.trim());
  params.append(`pageIndex`, filters.pageIndex);  
  params.append(`pageSize`, filters.pageSize);   
fetch(`https://rentcar.stepprojects.ge/api/Car/filter?${params}`)
  .then((resp) => resp.json())
  .then((data) => {
    main.innerHTML = ``;
    console.log(data);
    

    data.data.forEach((obj) => {
      let car = document.createElement(`div`);
      car.innerHTML = createCard(obj);
      main.appendChild(car);
      car.querySelector(`.fav-btn`)?.addEventListener(`click`, (e) => {
        e.stopPropagation()
        e.preventDefault()
        let user = JSON.parse(localStorage.getItem(`user`))
        let carId = e.target.dataset.id
            fetch(`https://rentcar.stepprojects.ge/api/Users/${user.phoneNumber}/favorites/${carId}`, {
      method: `POST`,
      headers: {"Content-Type": `application/json`}
    })
    .then(resp => resp.json())
    .then(data => {
      e.target.textContent = `❤️`
    })
      })

      car.addEventListener("click", () => {
        window.location.href = `./details.html?id=${obj.id}`;
      });
    });
  });
}
function createCard(obj) {
  let user = JSON.parse(localStorage.getItem(`user`))
  return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl3 || "placeholder.jpg"}" alt="${obj.brand || ""}" />
      <span class="car-badge">${obj.city || "უცნობი"}</span>
       ${user ? `<button class="fav-btn" data-id="${obj.id}">🤍</button>` : ``}
    </div>
    <div class="car-info">
      <div class="car-name">${obj.brand || "უცნობი"} ${obj.model || ""}</div>
      <div class="car-title">${obj.year || ""}</div>
      <div class="car-specs">
        <div class="spec"><span>⛽</span> ${obj.fuelCapacity || 0}L</div>
        <div class="spec"><span>⚙️</span> ${obj.transmission || "უცნობი"}</div>
        <div class="spec"><span>👥</span> ${obj.capacity || 0} Seats</div>
      </div>
      <div class="car-footer">
        <div class="car-price">
          $${obj.price || 0} <small>/ day</small>
        </div>
        <button class="rent-btn">Rent Now</button>
      </div>
    </div>
  </div>`;
}
filterBtn.addEventListener("click", () => {
  console.log(document.querySelector(`#startYear`).value)
  filters.capacity = document.querySelector(`#capacity`).value
  filters.startYear = document.querySelector(`#startYear`).value
  filters.endYear = document.querySelector(`#endYear`).value
  filters.city = document.querySelector(`#city`).value
  filters.phone = document.querySelector(`#phone`).value
  filters.pageIndex = 1
  fetchCars()
})
fetchCars()
})






