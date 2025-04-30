
let allCars = [];

function renderCars(cars) {
  const container = document.getElementById('car-list');
  container.innerHTML = '';
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
}

function filterCars() {
  const search = document.getElementById('search').value.toLowerCase();
  const brand = document.getElementById('brand-filter').value;
  const price = document.getElementById('price-filter').value;

  const filtered = allCars.filter(car => {
    const nameMatch = car.name.toLowerCase().includes(search);
    const brandMatch = !brand || car.brand === brand;
    let priceMatch = true;
    const carPrice = parseInt(car.price.replace('$', '').replace(',', ''));

    if (price === "low") priceMatch = carPrice < 20000;
    else if (price === "mid") priceMatch = carPrice >= 20000 && carPrice <= 50000;
    else if (price === "high") priceMatch = carPrice > 50000;

    return nameMatch && brandMatch && priceMatch;
  });

  renderCars(filtered);
}

fetch('cars.json')
  .then(response => response.json())
  .then(cars => {
    allCars = cars;
    renderCars(cars);

    // تعبئة فلتر الماركات
    const brands = [...new Set(cars.map(car => car.brand))];
    const brandFilter = document.getElementById('brand-filter');
    brands.forEach(brand => {
      const option = document.createElement('option');
      option.value = brand;
      option.textContent = brand;
      brandFilter.appendChild(option);
    });

    document.getElementById('search').addEventListener('input', filterCars);
    document.getElementById('brand-filter').addEventListener('change', filterCars);
    document.getElementById('price-filter').addEventListener('change', filterCars);
  });
