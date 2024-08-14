// src/components/Weather/HourlyWeatherCard.js
import React from 'react';


const HourlyWeatherCard = ({ data, unit }) => {
  if (!data || !data.data) return <div>No hourly data available.</div>;

  const now = new Date();
  const currentHour = now.getHours();

  // Filter to get only the next 3 hours including the current hour
  const filteredData = data.data.filter((hour) => {
    const hourDate = new Date(hour.ts * 1000);
    const hourOfDay = hourDate.getHours();
    return hourOfDay >= currentHour && hourOfDay < currentHour + 3;
  });

  return (
    <div className="hourly-weather-card">
      {filteredData.length > 0 ? (
        filteredData.map((hour, index) => (
          <div key={index} className="hourly-card">
            <p>{new Date(hour.ts * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>{`${Math.round(hour.temp)}${unit === 'metric' ? '°C' : '°F'}`}</p>
            <img
              src={`https://www.weatherbit.io/static/img/icons/${hour.weather.icon}.png`}
              alt={hour.weather.description}
              className="weather-icon"
            />
            <p>{hour.weather.description}</p>
          </div>
        ))
      ) : (
        <p>No data available for the next few hours.</p>
      )}
    </div>
  );
};

export default HourlyWeatherCard;
