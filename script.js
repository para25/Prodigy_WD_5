const apiKey = '95a1ac6510d00ea1ac4b43bc31a3da57';
const searchButton = document.getElementById('searchButton');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location.trim() !== '') {
        fetchWeatherData(location);
    }
});

async function fetchWeatherData(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const humidity = data.main.humidity;

        const weatherHtml = `
            <h2>Weather in ${data.name}, ${data.sys.country}</h2>
            <p>Condition: ${weatherDescription}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
        `;

        weatherInfo.innerHTML = weatherHtml;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = '<p>Unable to fetch weather data. Please try again later.</p>';
    }
}