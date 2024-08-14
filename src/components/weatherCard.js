import React from 'react';

const WeatherCard = ({ data, unit }) => {
  if (!data) {
    return <div>Loading...</div>; 
  }

  const { city_name, country_code, temp, weather, wind_spd, rh, pres, clouds } = data.data[0];
  const temperatureUnit = unit === 'M' ? '°C' : '°F';
  const windSpeedUnit = unit === 'M' ? 'm/s' : 'mph';

  return (
    <div className="weather-card">
      <h2>{`${city_name}, ${country_code}`}</h2>
      <h1>{`${Math.round(temp)}${temperatureUnit}`}</h1>
      <p>{weather.description}</p>
      <p>{`Wind: ${wind_spd} ${windSpeedUnit}`}</p>
      <p>{`Humidity: ${rh} %`}</p>
      <p>{`Pressure: ${pres} hPa`}</p>
      <p>{`Cloudiness: ${clouds} %`}</p>
    </div>
  );
};

export default WeatherCard;
