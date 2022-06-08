let now = new Date();

let did = document.querySelector("#day");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
did.innerHTML = `${day} ${hours}:${minutes}`;

// function displayForecast() {
//   let forecast = document.querySelector("#forecast");
//   forecast.innerHTML = `
//   `;
// }

function submitMe(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let input = document.querySelector("#search-city");
  city.innerHTML = `${input.value}`;
  if (city.innerHTML.length > 8) {
    city.style.fontSize = "51px";
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", submitMe);

// let changeMyCel = document.querySelector("#celsius");
// changeMyCel.addEventListener("click", showMyCel);

// function showMyCel(event) {
//   event.preventDefault();
//   let myCel = document.querySelector("#temp");
//   myCel.innerHTML = 58;
// }

let changeMyTemp = document.querySelector("#tempp");
changeMyTemp.addEventListener("click", showMyTemp);

function showMyTemp(event) {
  event.preventDefault();
  let myTemp = document.querySelector("#temp");
  myTemp.innerHTML = Math.round(celTempp);
}

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  searchCity(cityInput.value);
}

function searchCity(city) {
  let apiKey1 = "892622ecf527c4af16694837b25e5852";
  let apiURL1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey1}&units=metric`;
  axios.get(apiURL1).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function displayWeather(response) {
  celTempp = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(celTempp);
  document.querySelector("#hum").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("p.description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function showMyPosition(position) {
  let apiKey = "892622ecf527c4af16694837b25e5852";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showMyPosition);
}

let button = document.querySelector("#location");
button.addEventListener("click", getCurrentPosition);

function showFahTemp(event) {
  event.preventDefault();
  let tempEle = document.querySelector("#temp");
  let fahTemp = (celTempp * 9) / 5 + 32;
  tempEle.innerHTML = Math.round(fahTemp);
}

let celTempp = null;
displayForecast();

let fahlink = document.querySelector("#celsius");
fahlink.addEventListener("click", showFahTemp);
