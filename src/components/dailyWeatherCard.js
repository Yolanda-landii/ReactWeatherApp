import React from 'react';

// A utility function to map weather conditions to icon filenames
const getWeatherIcon = (conditionText) => {
  if (!conditionText) {
    return 'default-icon.png'; // Return a default icon if conditionText is undefined
  }

  switch (conditionText.toLowerCase()) {
    case 'sunny':
      return 'sunny.png';
    case 'rainy':
      return 'rainy.png';
    case 'cloudy':
      return 'cloudy.png';
    case 'snowy':
      return 'snowy.png';
    case 'windy':
      return 'windy.png';
    default:
      return 'default-icon.png'; // Fallback to a default icon if condition doesn't match
  }
};

const DailyWeatherCard = ({ data, unit }) => {
  if (!data || data.length < 5) return <div>Not enough weather data available.</div>;

  // Process data for 5 days
  const dailyData = [];
  for (let i = 0; i < 5; i++) {
    const dayData = data.slice(i * 24, (i + 1) * 24);
    // Use noon data (index 12) as a summary for the day
    const dailySummary = dayData[12];
    dailyData.push(dailySummary);
  }

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const now = new Date();
  const todayIndex = now.getDay();

  return (
    <div className="daily-weather-card">
      {dailyData.map((day, index) => {
        const dayIndex = (todayIndex + index) % 7;
        const avgTemp = unit === 'metric' ? day?.temp_c : day?.temp_f;
        const conditionText = day?.condition?.text;

        // Get the correct icon based on the condition text
        const iconFilename = getWeatherIcon(conditionText);
        const iconPath = `${process.env.PUBLIC_URL}/images/${iconFilename}`;

        console.log(`Icon Path: ${iconPath}`); // Debugging output

        return (
          <div key={index} className="daily-card">
            <p>{daysOfWeek[dayIndex]}</p>
            <p>{Math.round(avgTemp ?? 0)}°{unit === 'metric' ? 'C' : 'F'}</p>
            <img
              src={iconPath} 
              alt={conditionText ?? 'No condition'} 
              className="weather-icon"
              onError={(e) => {
                console.error(`Failed to load image at ${e.target.src}`); // Debugging output
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = `${process.env.PUBLIC_URL}/images/default-icon.png`; // Fallback image
              }}
            />
            <p>{conditionText ?? 'No condition'}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DailyWeatherCard;
