import React from 'react';

const DailyWeatherCard = ({ data, unit }) => {
  if (!data || !data.data) return <div>No daily data available.</div>;

  // Map the days of the week for easier access
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get today's day index
  const now = new Date();
  const todayIndex = now.getDay();

  // Filter to get today's weather and the next 4 days
  const filteredData = data.data.slice(0, 5);

  return (
    <div className="daily-weather-card">
      {filteredData.length > 0 ? (
        filteredData.map((day, index) => {
          const dayIndex = (todayIndex + index) % 7; 
          return (
            <div key={index} className="daily-card">
              <p>{daysOfWeek[dayIndex]}</p>
              <p>{Math.round(day.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
              <img
                src={`https://www.weatherbit.io/static/img/icons/${day.weather.icon}.png`}
                alt={day.weather.description}
                className="weather-icon"
              />
              <p>{day.weather.description}</p>
            </div>
          );
        })
      ) : (
        <p>No data available for the next few days.</p>
      )}
    </div>
  );
};

export default DailyWeatherCard;
