document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const searchBtn = document.getElementById("search-btn");
  const weatherDisplay = document.getElementById("weather-display");
  const cityNameDisplay = document.getElementById("city-name");
  const weatherDescDisplay = document.getElementById("weather-desc");
  const temperatureDisplay = document.getElementById("temperature");
  const humidityDisplay = document.getElementById("humidity");
  const windSpeedDisplay = document.getElementById("wind-speed");
  const pressureDisplay = document.getElementById("pressure");
  const sunriseDisplay = document.getElementById("sunrise");
  const sunsetDisplay = document.getElementById("sunset");
  const errorMsg = document.getElementById("error-msg");
  const loadingMsg = document.getElementById("loading-msg");

  const API_KEY = "19363039a84c68bb3c01d20a20881004";

  searchBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) {
      showError("Please enter a city name.");
      return;
    }
    clearMessages();
    showLoading(true);

    try {
      const data = await fetchWeather(city);
      displayWeather(data);
      updateBackground(data.weather[0].main.toLowerCase());
    } catch (error) {
      showError(error.message || "Error fetching weather data.");
      resetBackground();
    } finally {
      showLoading(false);
    }
  });

  function showError(message) {
    errorMsg.textContent = message;
    errorMsg.classList.remove("hidden");
    weatherDisplay.classList.add("hidden");
  }

  function clearMessages() {
    errorMsg.classList.add("hidden");
    weatherDisplay.classList.add("hidden");
  }

  function showLoading(show) {
    if (show) {
      loadingMsg.classList.remove("hidden");
    } else {
      loadingMsg.classList.add("hidden");
    }
  }

  async function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found or API error.");
    }
    return await response.json();
  }

  function displayWeather(data) {
    cityNameDisplay.textContent = data.name;
    weatherDescDisplay.textContent = `Condition: ${data.weather[0].description}`;
    temperatureDisplay.textContent = `Temperature: ${data.main.temp} °C`;
    humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeedDisplay.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    pressureDisplay.textContent = `Pressure: ${data.main.pressure} hPa`;

    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    sunriseDisplay.textContent = `Sunrise: ${sunrise}`;
    sunsetDisplay.textContent = `Sunset: ${sunset}`;

    weatherDisplay.classList.remove("hidden");
    errorMsg.classList.add("hidden");
  }

  function updateBackground(condition) {
    const body = document.body;
    body.classList.remove("rainy", "summer", "winter", "clear");

    if (condition.includes("rain")) {
      body.classList.add("rainy");
    } else if (condition.includes("clear")) {
      body.classList.add("clear");
    } else if (condition.includes("snow") || condition.includes("winter")) {
      body.classList.add("winter");
    } else if (condition.includes("sun") || condition.includes("summer")) {
      body.classList.add("summer");
    } else {
      // Default background
      body.classList.add("clear");
    }
  }

  function resetBackground() {
    const body = document.body;
    body.classList.remove("rainy", "summer", "winter", "clear");
  }
});
