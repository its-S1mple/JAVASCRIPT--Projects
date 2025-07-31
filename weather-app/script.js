document.addEventListener("DOMContentLoaded", () => {
  const cityNameInput = document.getElementById("city-name");
  const btn = document.getElementById("btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const pressureDisplay = document.getElementById("pressure");
  const sunriseDisplay = document.getElementById("sunrise");
  const sunsetDisplay = document.getElementById("sunset");
  const errorMessage = document.getElementById("error-message");
  const loadingIndicator = document.getElementById("loading");

  const API_KEY = "19363039a84c68bb3c01d20a20881004"; //env variables

  // Cache for recent successful queries
  const cache = new Map();

  btn.addEventListener("click", async () => {
    const cityName = cityNameInput.value.trim();

    // Input validation: only letters, spaces, and hyphens allowed
    if (!/^[a-zA-Z\s-]+$/.test(cityName)) {
      weatherInfo.classList.add("hidden");
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = "Invalid city name. Please enter letters only.";
      errorMessage.style.color = "yellow";
      return;
    }

    if (cityName === "") {
      weatherInfo.classList.add("hidden");
      errorMessage.classList.remove("hidden");
      errorMessage.textContent = "Please! Enter a City name.";
      errorMessage.style.color = "yellow";
      return;
    }

    errorMessage.classList.add("hidden");
    loadingIndicator.classList.remove("hidden");
    weatherInfo.classList.add("hidden");

    try {
      let weatherData;
      if (cache.has(cityName.toLowerCase())) {
        weatherData = cache.get(cityName.toLowerCase());
      } else {
        weatherData = await fetchWeatherData(cityName);
        cache.set(cityName.toLowerCase(), weatherData);
      }
      displayWeatherData(weatherData);
    } catch (error) {
      weatherInfo.classList.add("hidden");
      errorMessage.classList.remove("hidden");

      if (error.message.includes("404")) {
        errorMessage.textContent = "City not found. Please check the city name.";
      } else {
        errorMessage.textContent =
          "Error fetching weather data. Please try again later.";
      }
      errorMessage.style.color = "yellow";
    } finally {
      loadingIndicator.classList.add("hidden");
    }
  });

  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    console.log(data);

    const { name, main, weather, wind, sys } = data;

    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp} °C`;
    descriptionDisplay.textContent = `Description: ${weather[0].description}`;
    humidityDisplay.textContent = `Humidity: ${main.humidity}%`;
    windSpeedDisplay.textContent = `Wind Speed: ${wind.speed} m/s`;
    pressureDisplay.textContent = `Pressure: ${main.pressure} hPa`;

    // Convert sunrise and sunset from UNIX timestamp to local time string
    const sunriseDate = new Date(sys.sunrise * 1000);
    const sunsetDate = new Date(sys.sunset * 1000);
    sunriseDisplay.textContent = `Sunrise: ${sunriseDate.toLocaleTimeString()}`;
    sunsetDisplay.textContent = `Sunset: ${sunsetDate.toLocaleTimeString()}`;

    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");
  }
});
