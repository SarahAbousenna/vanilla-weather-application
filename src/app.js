//*****---- Function - Display Current Date and Time ----*****//
//-----------------------------------------------------------//
function dateTime(currDate) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Spetember",
    "October",
    "November",
    "December",
  ];

  let date = currDate.getDate();
  let month = months[currDate.getMonth()];
  let day = days[currDate.getDay()];
  let hours = currDate.getHours();
  if (hours < 10) hours = "0" + hours;
  let minutes = currDate.getMinutes();
  if (minutes < 10) minutes = "0" + minutes;

  return `<i class="fa-solid fa-calendar-days"></i>  ${day}, ${month} ${date}  <i class="fas fa-clock"></i> ${hours}:${minutes}`;
}

let existingDate = document.querySelector("#curr-date");
let currDate = new Date();
existingDate.innerHTML = dateTime(currDate);

//*****---- Function - Display convert Celsius to Fahrenheite ----*****//
//--------------------------------------------------------------------//

// function convertCel() {
//   let cel = document.querySelector("#current-weather");
//   cel.innerHTML = 1;
// }

// function convertFahr() {
//   let fah = document.querySelector("#current-weather");
//   fah.innerHTML = Math.round((1 * 9) / 5 + 32);
// }

// let converttoCel = document.querySelector("#celsius-degree");
// converttoCel.addEventListener("click", convertCel);

// let converttoFah = document.querySelector("#fahrenheit-degree");
// converttoFah.addEventListener("click", convertFahr);

//*****---- Function - Display City Temprature + Weather Details ----*****//
//-----------------------------------------------------------------------//

function showTemperature(response) {
  document.querySelector("#currentcity").innerHTML = response.data.name;
  document.querySelector("#current-weather").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currentcountry").innerHTML =
    response.data.sys.country;

  //   document.querySelector("#fri-hi").innerHTML = Math.round(
  // response.data.main.temp.max
}

//*****---- Function - Display Searched City Name ---> Show Searched City Temperature ----*****//
//--------------------------------------------------------------------------------------------//

// *** spliting the search and the city name so we can have a default city appear on load *** //
// function searched city will receive a city --> will make an API call --> Display said city's temperature

function searchCity(cityName) {
  let apiKey = "aae8baa2317f56f58a77ca41fca89dc2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

//function handleSubmit whenever the search form is submitted it will fetch the city input value and search for it

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchbar").value;
  searchCity(cityName);
}

let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", handleSubmit);

// searchedCity is doing the search on load and displaying the weather for NewYork which is the default city //

searchCity("Toronto");

//*****---- Function - Display Current Location ----*****//
//------------------------------------------------------//

// function showCurrentLocation(response) {
//   let currCityName = document.querySelector("#currentcity");
//   currCityName.innerHTML = `${response.data.name}`;
// }

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
  // axios.get(url).then(showCurrentLocation);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

//*****---- Function - Display Weekly Temperature ----*****//
//---------------------------------------------------------//
