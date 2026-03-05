document.addEventListener(`DOMContentLoaded` , () => {

let main = document.querySelector(`main`);
let filterBtn = document.querySelector(`#filterBtn`)

let filters = {
  capacity: ``,
  startYear: ``,
  endYear: ``,
  city: ``,
  pageIndex: 1,
  pageSize: 10,
};

function fetchCars() {
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

    data.data.forEach((obj) => {
      let car = document.createElement(`div`);
      car.innerHTML += createCard(obj);
      main.appendChild(car);

      car.addEventListener("click", () => {
        window.location.href = `./details.html?id=${obj.id}`;
      });
    });
  });
}
function createCard(obj) {
  return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl3 || "placeholder.jpg"}" alt="${obj.brand || ""}" />
      <span class="car-badge">${obj.city || "უცნობი"}</span>
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
  filters.pageIndex = 1
  fetchCars()
})
fetchCars()
})




//     return    `<div class="car-card">
//     <div class="car-image-wrap">
//       <img src="${obj.imageUrl3}" alt="${obj.brand}" />
//       <span class="car-badge">${obj.city}</span>
//     </div>
//     <div class="car-info">
//       <div class="car-name">${obj.brand} ${obj.model}</div>
//       <div class="car-title">${obj.year}</div>
//       <div class="car-specs">
//         <div class="spec"><span>⛽</span> ${obj.fuelCapacity}L</div>
//         <div class="spec"><span>⚙️</span> ${obj.transmission}</div>
//         <div class="spec"><span>👥</span> ${obj.capacity} Seats</div>
//       </div>
//       <div class="car-footer">
//         <div class="car-price">
//           $${obj.price} <small>/ day</small>
//         </div>
//         <button class="rent-btn">Rent Now</button>
//       </div>
//     </div>
//   </div> `


