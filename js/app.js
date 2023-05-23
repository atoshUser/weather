const changeLocation = document.getElementById("change-location");
const card = document.getElementById("card");
const details = document.getElementById("details");
const weatherIcon = document.getElementById("weather-icon");
const overlay = document.getElementById("overlay");

changeLocation["city"].focus();

// CHANGE HTML UI
const updateUI = (data) => {
    card.style.visibility = "visible";
    weatherIcon.setAttribute(
        "src",
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    );
    const {
        name,
        sys: { country },
        main: { temp },
    } = data;
    details.innerHTML = `
  <h5 class="mb-3">${name}, ${country}</h5>
  <p class="mb-3">${data.weather[0].main}</p>
  <div class="display-4 mb-3">
      <span>${temp}</span>
      <span>&deg;C</span>
  </div>

  `;
};

//GET WEATHER
const getWeather = async (city) => {
    const data = await getData(city);
    return data;
};

// GET LOCATION
changeLocation.addEventListener("submit", (e) => {
    e.preventDefault();
    const cityName = changeLocation["city"].value.trim();
    changeLocation.reset();

    getWeather(cityName).then((data) => updateUI(data));
});
