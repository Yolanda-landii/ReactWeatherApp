import React from 'react';

const WeatherCard = ({ data, unit }) => {
  // Check if data is available
  if (!data || !data.location || !data.current) {
    return <div>No weather data available.</div>;
  }
  console.log('WeatherCard data:', data);

  // Destructure relevant properties from the data
  const { name: city_name, country: country_code } = data.location;
  const { temp_c, temp_f, condition, wind_kph, wind_mph, humidity: rh, pressure_mb: pres, cloud: clouds } = data.current;

  // Determine temperature and wind speed units
  const temp = unit === 'M' ? temp_c : temp_f;
  const wind_spd = unit === 'M' ? wind_kph : wind_mph;
  const temperatureUnit = unit === 'M' ? '°C' : '°F';
  const windSpeedUnit = unit === 'M' ? 'kph' : 'mph';

  return (
    <div className="weather-card">
      <h2>{`${city_name}, ${country_code}`}</h2>
      <h1>{`${Math.round(temp)}${temperatureUnit}`}</h1>
      <p>{condition.text}</p>
      <p>{`Wind: ${wind_spd} ${windSpeedUnit}`}</p>
      <p>{`Humidity: ${rh} %`}</p>
      <p>{`Pressure: ${pres} hPa`}</p>
      <p>{`Cloudiness: ${clouds} %`}</p>
    </div>
  );
};

export default WeatherCard;
