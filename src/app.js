//*****---- ⚠️ FUNCTION: Display Current Date and Time ----*****//

function dateTime(currDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
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

//*****---- ⚠️ FUNCTION: Convert Celsius to Fahrenheite ----*****//

// function displayFahrenhiteDegree(event) {
//   event.preventDefault();
//   let fahrenhiteTemp = (celsiusTemperature * 9) / 5 + 32;
//   // remove active class from celcuis
//   celsiusLink.classList.remove("active");
//   // add active class to fahrenhite
//   fahrenhiteLink.classList.add("active");
//   let temperatureElement = document.querySelector("#current-weather");
//   temperatureElement.innerHTML = Math.round(fahrenhiteTemp);
// }

// function displaycelsiusDegree(event) {
//   event.preventDefault;
//   // add active class to celcuis
//   celsiusLink.classList.add("active");
//   // remove active class from fahrenhite
//   fahrenhiteLink.classList.remove("active");
//   let temperatureElement = document.querySelector("#current-weather");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }

//****---- ⚠️ FUNCTION: Display weekly forcast >>>>>>>>

function displayWeeklyForcast(response) {
  let forecast = response.data.daily;
  let forcastElement = document.querySelector("#weekly-forcast");
  let forcastHTML = `<div class="row">`;

  forecast.forEach(function (forcastDay, index) {
    if (index > 0 && index < 7) {
      forcastHTML =
        forcastHTML +
        `
              <div class="col">
                <div class="weekly-forecast-date">${formateDay(
                  forcastDay.dt
                )}</div>
                <img
                  src="./images/iconsWeather/${forcastDay.weather[0].icon}.svg"
                  alt=""
                  class="weekly-forcast-icon"
                />
                <div class="weekly-forecast-temperatures">
                  <span class="weekly-forecast-temperature-max"> ${Math.round(
                    forcastDay.temp.max
                  )}° </span>
                  <span class="weekly-forecast-temperature-min"> ${Math.round(
                    forcastDay.temp.min
                  )}° </span>
                  <span> C </span>
                </div>   
              </div>
            `;
    }
  });
  forcastHTML = forcastHTML + `</div>`;
  forcastElement.innerHTML = forcastHTML;
}

// ➡️ Changes the date (day) format of the API to an actual day of the week for weekly forcast function

function formateDay(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  return days[day];
}

// ➡️ Gets the Lat and Lon for weekly forcast function ----*****//

function getForecast(coordinates) {
  let apiKey = "aae8baa2317f56f58a77ca41fca89dc2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeeklyForcast);
}

//***** ⚠️ FUNCTION: Weather Warning alert *******//

function showAlerts(response) {
  let alertsElement = document.querySelector("#alerts");
  if (response.data.alerts && response.data.alerts.length > 0) {
    alertsElement.style.backgroundColor = "#981f15";
    alertsHTML = `<div class="alert"> ⚠️ WEATHER ALERT: ${response.data.alerts[0].event} </div>`;
    alertsElement.innerHTML = alertsHTML;
  } else {
    alertsElement.innerHTML = "";
    alertsElement.style.backgroundColor = "#fdf8f4";
  }
}

function alertsCoords(coordinates) {
  let apiKey = "aae8baa2317f56f58a77ca41fca89dc2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showAlerts);
}

//***** ⚠️ FUNCTION: MORE INFO about Weather Warning alert *******//

function moreInfoCoords(coordinates) {
  let apiKey = "aae8baa2317f56f58a77ca41fca89dc2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(moreInfo);
}

function moreInfo(response) {
  let alertInfo = document.querySelector("#moreinfo");
  if (response.data.alerts && response.data.alerts.length > 0) {
    alertInfo.style.backgroundColor = "rgb(152, 31, 20, 0.4)";
    alertInfo.innerHTML = response.data.alerts[0].description;
  } else {
    alertInfo.innerHTML = "";
    alertInfo.style.backgroundColor = "#fdf8f4";
  }
}

//*****---- ⚠️ FUNCTION: Display Current City Temprature + Weather Details ----*****//

function showTemperature(response) {
  let temperatureElement = document.querySelector("#current-weather");
  let cityElement = document.querySelector("#currentcity");
  let countryElement = document.querySelector("#currentcountry");
  let descriptionElement = document.querySelector("#weather-description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#curr-weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  countryElement.innerHTML = response.data.sys.country;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);

  iconElement.setAttribute(
    "src",
    `./images/iconsWeather/${response.data.weather[0].icon}.svg`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
  alertsCoords(response.data.coord);
  moreInfoCoords(response.data.coord);
}

// ➡️ Receive a city --> will make an API call --> Display said city's temperature

function searchCity(cityName) {
  let apiKey = "aae8baa2317f56f58a77ca41fca89dc2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

// ➡️  Whenever the search form is submitted it will fetch the city input value and search for it

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#searchbar").value;
  searchCity(cityName);
}

//***** ⚠️ FUNCTION: Display Current Location based on geolocation ----*****//

function showPosition(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?&lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(url).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

//***** ⚠️ FUNCTION: Change Background according to hour of the day ----*****//

function changeBackground() {
  let day = new Date();
  let currentTime = day.getHours();
  let images = document.querySelector("#bkgroundimg");
  if (currentTime >= 5 && currentTime < 9) {
    images.setAttribute("src", `images/dawn.jpg`);
  } else if (currentTime >= 9 && currentTime < 18) {
    images.setAttribute("src", `images/morning.jpg`);
  } else if (currentTime >= 18 && currentTime < 20) {
    images.setAttribute("src", `images/afternoon.jpg`);
  } else {
    images.setAttribute("src", `images/night.jpg`);
  }
}

// 🌎 GLOBAL VARIABLES 🌎 //

let existingDate = document.querySelector("#curr-date");
let currDate = new Date();
existingDate.innerHTML = dateTime(currDate);

let newCity = document.querySelector("#search-form");
newCity.addEventListener("submit", handleSubmit);

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentPosition);

// let celsiusTemperature = null;

// let fahrenhiteLink = document.querySelector("#fahrenheit-degree");
// fahrenhiteLink.addEventListener("click", displayFahrenhiteDegree);

// let celsiusLink = document.querySelector("#celsius-degree");
// celsiusLink.addEventListener("click", displaycelsiusDegree);

// ☎️ FUNCTION CALLING ☎️ //

changeBackground();
searchCity("Toronto");
