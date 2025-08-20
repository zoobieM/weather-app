const apiKey = "b381f93031c2471e895173608252008";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name!");
    return;
  }
  fetchWeather(city);
}

async function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeather(`${lat},${lon}`);
      },
      (error) => {
        alert("Location access denied. Please enter city manually.");
      }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

async function fetchWeather(query) {
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    document.getElementById("weatherResult").innerHTML =
      `<p style="color:red;">❌ ${error.message}</p>`;
  }
}

function displayWeather(data) {
  const weatherDiv = document.getElementById("weatherResult");

  weatherDiv.innerHTML = `
    <h2>${data.location.name}, ${data.location.country}</h2>
    <p>🌡 Temperature: ${data.current.temp_c}°C</p>
    <p>☁ Condition: ${data.current.condition.text}</p>
    <p>💧 Humidity: ${data.current.humidity}%</p>
    <p>🌬 Wind: ${data.current.wind_kph} kph</p>
    <img src="https:${data.current.condition.icon}" alt="Weather icon">
  `;
}
