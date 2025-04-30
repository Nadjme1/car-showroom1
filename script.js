
fetch('cars.json')
  .then(response => response.json())
  .then(cars => {
    const container = document.getElementById('car-list');
    cars.forEach(car => {
      const carCard = `
        <div class="car">
          <img src="${car.image}" alt="${car.name}">
          <h2>${car.name}</h2>
          <p>الشركة: ${car.brand}</p>
          <p>السعر: ${car.price}</p>
          <p>السنة: ${car.year}</p>
          <p>${car.description}</p>
        </div>`;
      container.innerHTML += carCard;
    });
  });
