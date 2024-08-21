import React from 'react';

const HourlyWeatherCard = ({ data, unit }) => {
  // console.log('HourlyWeatherCard data:', data);

  // Access forecast data
  const forecastDay = data?.forecast?.forecastday?.[0]?.hour;
  // console.log('Forecast Day:', forecastDay);

  if (!forecastDay || forecastDay.length === 0) {
    return <div>No hourly data available.</div>;
  }

  // Get the current hour
  const now = new Date();
  const currentHour = now.getHours();
  // console.log('Current Hour:', currentHour);

  // Filter to get the next 5 hours including the current hour
  const filteredData = forecastDay
    .filter((hour) => {
      const hourDate = new Date(hour.time);
      const hourOfDay = hourDate.getHours();
      return hourOfDay >= currentHour && hourOfDay < currentHour + 5;
    })
    .slice(0, 5); // Ensure we only show up to 5 hours
  
  // console.log('Filtered Data:', filteredData);

  if (filteredData.length === 0) {
    return <div>No data available for the next few hours.</div>;
  }

  return (
    <div className="hourly-weather-card">
      {filteredData.map((hour, index) => {
        const iconFilename = hour.condition?.icon ? hour.condition.icon.split('/').pop() : 'default-icon.png';
        const iconPath = `${process.env.PUBLIC_URL}/images/${iconFilename}`;

        return (
          <div key={index} className="hourly-card">
            <p>{new Date(hour.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>{`${Math.round(unit === 'metric' ? hour.temp_c : hour.temp_f)}°${unit === 'metric' ? 'C' : 'F'}`}</p>
            <img
              src={iconPath} 
              alt={hour.condition?.text ?? 'No condition'} 
              className="weather-icon"
              onError={(e) => {
                console.error(`Failed to load image at ${e.target.src}`);
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/images/default-icon.png`;
              }}
            />
            <p>{hour.condition?.text ?? 'No condition'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyWeatherCard;
