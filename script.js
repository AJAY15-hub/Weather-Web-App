async function getWeather() {
    const apiKey = '357b432598de4c23cc30c4e4df451888'; 
    const city = document.getElementById('cityInput').value;
    const resultDiv = document.getElementById('weatherResult');

    if (!city) {
        resultDiv.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(
            `http://api.weatherstack.com/current?access_key=${apiKey}&query=${encodeURIComponent(city)}`
        );
        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.info);
        }

        const weatherHTML = `
            <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
            <p><strong>Temperature:</strong> ${data.current.temperature} °C</p>
            <p><strong>Weather:</strong> ${data.current.weather_descriptions[0]}</p>
            <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.current.wind_speed} km/h</p>
            <img src="${data.current.weather_icons[0]}" alt="Weather icon">
        `;
        resultDiv.innerHTML = weatherHTML;
    } catch (error) {
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
