const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=47.6370021&longitude=12.9985781&daily=temperature_2m_max,temperature_2m_min,weather_code,relative_humidity_2m_mean&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=Europe%2FBerlin&forecast_days=3';

function fetchWeather() {
  fetch(apiUrl)
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      const currentTemp = data.current.temperature_2m;
      document.getElementById('weather').textContent = `Current Temperature: ${currentTemp}°C`;
        console.log(currentTemp)
        console.log(data)
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

fetchWeather()
setInterval(fetchWeather, 3600000);