// app.js

const apiKey = '99eab4ee8372b1b6688eeb6aaa0e776c'; // Replace with your actual OpenWeatherMap API key
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');

const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

const errorMessage = document.querySelector('.error-message');

async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            showError("Location not found");
            return;
        }

        displayWeather(data);
    } catch (error) {
        showError("Something went wrong");
    }
}

function displayWeather(data) {
    cityName.textContent = data.name;
    temperature.textContent = `${data.main.temp}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} km/h`;

    // Set the weather icon based on the condition
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}.png`;

    errorMessage.style.display = 'none';
}

function showError(message) {
    errorMessage.style.display = 'block';
    errorMessage.textContent = message;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();

    if (city) {
        fetchWeatherData(city);
    } else {
        showError("Please enter a city");
    }
});
