import React from 'react';

const WeatherCard = ({ data, unit }) => {
  if (!data) {
    return <div>Loading...</div>; // Or a placeholder component
  }

  const { name, sys, main, weather, wind, clouds } = data;
  const temperatureUnit = unit === 'metric' ? '°C' : '°F';
  const windSpeedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="weather-card">
      <h2>{`${name}, ${sys.country}`}</h2>
      <h1>{`${Math.round(main.temp)}${temperatureUnit}`}</h1>
      <p>{weather[0].description}</p>
      <p>{`Wind: ${wind.speed} ${windSpeedUnit}`}</p>
      <p>{`Humidity: ${main.humidity} %`}</p>
      <p>{`Pressure: ${main.pressure} hPa`}</p>
      <p>{`Cloudiness: ${clouds.all} %`}</p>
    </div>
  );
};

export default WeatherCard;
