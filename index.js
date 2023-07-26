const city = document.querySelector("#city");
const button = document.querySelector("button");

async function checkWeather(city) {
  const cityName = document.querySelector("#cityName");
  const temp = document.querySelector("#temp");
  const max = document.querySelector("#max");
  const min = document.querySelector("#min");
  const smallTemp = document.querySelector("#small-temp");
  const icon = document.querySelector("#icon");
  const humidity = document.querySelector("#humidity");
  const wind = document.querySelector("#wind");
  const pressure = document.querySelector("#pressure");
  const sunrise = document.querySelector("#sunrise");
  const sunset = document.querySelector("#sunset");
  const visibility = document.querySelector("#visibility");
  const description = document.querySelector("#description");

  await axios({
    method: "get",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=77b28523d26ef774b38ff8499841cd01&units=metric`,
  })
    .then(function (response) {
      console.log(response.data);
      cityName.textContent = response.data.name;
      temp.textContent = Math.round(response.data.main.temp) + "°C";
      max.textContent = Math.round(response.data.main.temp_max) + "°C";
      min.textContent = Math.round(response.data.main.temp_min) + "°C";
      smallTemp.textContent = Math.round(response.data.main.feels_like) + "°C";
      humidity.textContent = Math.round(response.data.main.humidity) + "%";
      wind.textContent = response.data.wind.speed + " " + "km/h";
      pressure.textContent = response.data.main.pressure + " " + "hPa";
      visibility.textContent = response.data.visibility / 1000 + " " + "km";
      description.textContent = response.data.weather[0].description;

      const dateSunrise = new Date(response.data.sys.sunrise * 1000);
      let hoursSunrise = dateSunrise.getHours();
      hoursSunrise < 10 ? hoursSunrise = `0${hoursSunrise}` : hoursSunrise;
      let minutesSunrise = dateSunrise.getMinutes();
      minutesSunrise < 10 ? minutesSunrise = `0${minutesSunrise}` : minutesSunrise;
      sunrise.textContent = hoursSunrise + ':' + minutesSunrise;

      const dateSunset = new Date(response.data.sys.sunset * 1000);
      let hoursSunset = dateSunset.getHours();
      hoursSunset < 10 ? hoursSunset = `0${hoursSunset}` : hoursSunset;
      let minutesSunset = dateSunset.getMinutes();
      minutesSunset < 10 ? minutesSunset = `0${minutesSunset}` : minutesSunset;
      sunset.textContent =  hoursSunset + ':' + minutesSunset;

      if (response.data.weather[0].main == "Clouds") {
        icon.src = "images/clouds.png";
        icon.alt = "clouds";
      } else if (response.data.weather[0].main == "Clear") {
        icon.src = "images/clear.png";
        icon.alt = "clear weather";
      } else if (response.data.weather[0].main == "Drizzle") {
        icon.src = "images/drizzle.png";
        icon.alt = "drizzle";
      } else if (response.data.weather[0].main == "Mist") {
        icon.src = "images/mist.png";
        icon.alt = "mist";
      } else if (response.data.weather[0].main == "Rain") {
        icon.src = "images/rain.png";
        icon.alt = "rain";
      } else if (response.data.weather[0].main == "Snow") {
        icon.src = "images/snow.png";
        icon.alt = "snow";
      } else if (response.data.weather[0].main == "Wind") {
        icon.src = "images/wind.png";
        icon.alt = "wind";
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

button.addEventListener("click", (event) => {
  event.preventDefault();
  checkWeather(city.value);
});
