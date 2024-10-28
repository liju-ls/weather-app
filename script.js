let btn = document.getElementById("btn");
let cityName = document.getElementById("cityName");
let weatherText = document.getElementById("weatherText");

let city = "";

btn.addEventListener("click", () => {
  if (cityName.value.length > 1) {
    city = cityName.value;
        getWeather(city);
  }
});

async function getWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=27247c9aa91c4d8d82d155636242810&q=${city}&aqi=no`
    );
    if (!response.ok) {
      throw new Error(`Error : ${response.status}`);
    }

    response.json().then((data) => {
      showWeather(data);
    });
  } catch (error) {
    console.log(error);
  }
}

function showWeather(data) {
  weatherText.textContent = data.current.condition.text;
}