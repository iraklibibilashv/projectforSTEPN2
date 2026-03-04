let main = document.querySelector(`main`)



fetch(`https://rentcar.stepprojects.ge/api/Car`)
.then(resp => resp.json())
.then(data => {
    console.log(data);
     
    data.forEach(obj => {
        

    let car = document.createElement(`div`)
    car.innerHTML += createCard(obj)
    main.appendChild(car)

    car.addEventListener("click",() => {
        window.location.href = `./details.html?id=${obj.id}`

    })
    
})
    });


function createCard(obj) {
  return `<div class="car-card">
    <div class="car-image-wrap">
      <img src="${obj.imageUrl3 || 'placeholder.jpg'}" alt="${obj.brand || ''}" />
      <span class="car-badge">${obj.city || 'უცნობი'}</span>
    </div>
    <div class="car-info">
      <div class="car-name">${obj.brand || 'უცნობი'} ${obj.model || ''}</div>
      <div class="car-title">${obj.year || ''}</div>
      <div class="car-specs">
        <div class="spec"><span>⛽</span> ${obj.fuelCapacity || 0}L</div>
        <div class="spec"><span>⚙️</span> ${obj.transmission || 'უცნობი'}</div>
        <div class="spec"><span>👥</span> ${obj.capacity || 0} Seats</div>
      </div>
      <div class="car-footer">
        <div class="car-price">
          $${obj.price || 0} <small>/ day</small>
        </div>
        <button class="rent-btn">Rent Now</button>
      </div>
    </div>
  </div>`

}



    
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