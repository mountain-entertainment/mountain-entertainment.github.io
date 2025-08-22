const WeatherCode = {
  "0": "Unknown",
  "1000": "Clear, Sunny",
  "1100": "Mostly Clear",
  "1101": "Partly Cloudy",
  "1102": "Mostly Cloudy",
  "1001": "Cloudy",
  "2000": "Fog",
  "2100": "Light Fog",
  "4000": "Drizzle",
  "4001": "Rain",
  "4200": "Light Rain",
  "4201": "Heavy Rain",
  "5000": "Snow",
  "5001": "Flurries",
  "5100": "Light Snow",
  "5101": "Heavy Snow",
  "6000": "Freezing Drizzle",
  "6001": "Freezing Rain",
  "6200": "Light Freezing Rain",
  "6201": "Heavy Freezing Rain",
  "7000": "Ice Pellets",
  "7101": "Heavy Ice Pellets",
  "7102": "Light Ice Pellets",
  "8000": "Thunderstorm"
}

function getWindDirection(degrees) {
  const directions = [
    { min: 0, max: 22.5, label: 'N' },
    { min: 22.5, max: 67.5, label: 'NO' },
    { min: 67.5, max: 112.5, label: 'O' },
    { min: 112.5, max: 157.5, label: 'SO' },
    { min: 157.5, max: 202.5, label: 'S' },
    { min: 202.5, max: 247.5, label: 'SW' },
    { min: 247.5, max: 292.5, label: 'W' },
    { min: 292.5, max: 337.5, label: 'NW' },
    { min: 337.5, max: 360, label: 'N' },
  ];

  for (const direction of directions) {
    if (degrees >= direction.min && degrees < direction.max) {
      return direction.label;
    }
  }
}

const myHeaders = new Headers();
myHeaders.append("Accept", "application/json");

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow"
};

function fetchWeather() {
  const url = "https://api.brightsky.dev/current_weather?lat=47.6369799&lon=13.0398633&tz=Europe/Berlin";

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const weather = data.weather[0]; 
      const temp = weather.temperature;
      const wind = weather.wind_speed;

      document.getElementById('weather').textContent = `Temp: ${temp}°C, Wind: ${wind} m/s`;
    })
    .catch((error) => console.error('Error fetching weather:', error));
}

fetchWeather()
setInterval(fetchWeather, 3600000);

