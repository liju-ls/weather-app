let btn = document.getElementById("btn");
let cityName = document.getElementById("cityName");
let weatherText = document.getElementById("weatherText");
let weatherIcon = document.getElementById("weatherIcon");
let dateOfToday = document.getElementById("dateOfToday");
let temperature = document.getElementById("temperature");
let windAndHumidity = document.getElementById("windAndHumidity");

let city = "chennai";

btn.addEventListener("click", () => {
  if (cityName.value.length > 1) {
    btn.style.visibility = "hidden";
    city = cityName.value;
    getWeather(city);
  }
});

cityName.addEventListener("input", (e) => {
  btn.style.visibility = "visible";
});

getWeather(city);

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=27247c9aa91c4d8d82d155636242810&q=${city}&aqi=no`
    );
    if (!response.ok) {
      response.json().then((data) => {
        clear();
        showError(data);
      });
    } else {
      response.json().then((data) => {
        clear();
        showWeather(data);
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function showWeather(data) {
  let t = data.location.localtime.split("-")[2];
  let wAndH = data.current.wind_kph + " KPH / " + data.current.humidity + "%";
  let temp = data.current.temp_c.toString().split(".")[0];
  console.log();
  weatherText.textContent = data.current.condition.text;
  weatherIcon.src = data.current.condition.icon;
  dateOfToday.textContent = t;
  temperature.textContent = temp;
  windAndHumidity.textContent = wAndH;
}

function showError(data) {
  weatherText.textContent = data.error.message;
}

function clear() {
  weatherText.textContent = "";
  weatherIcon.src = "";
}
