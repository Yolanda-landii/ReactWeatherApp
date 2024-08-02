import React, { useState, useEffect } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import SavedLocations from './components/SavedLocation';
import WeatherAlert from './components/Notifications';
import Settings from './components/Settings';
import Navigation from './components/Navigation';
import useWeather from './Hooks/useWeather';
import './App.css';

const App = () => {
  const [themeMode, setThemeMode] = useState('light');
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [view, setView] = useState('daily'); // 'daily' or 'hourly'
  const { weatherData, hourlyData, dailyData, fetchWeather, fetchWeatherByCoords } = useWeather();

  const theme = createTheme({
    palette: {
      mode: themeMode,
    },
  });

  const handleSearch = (location) => {
    fetchWeather(location, unit);
  };

  const handleThemeChange = (mode) => {
    setThemeMode(mode);
  };

  const handleUnitChange = (unit) => {
    setUnit(unit);
  };

  const handleViewChange = (view) => {
    setView(view);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, unit);
    });
  }, [unit, fetchWeatherByCoords]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="container">
        <Navigation />
        <SearchBar onSearch={handleSearch} className="search-bar" />
        {weatherData && (
          <WeatherCard data={weatherData} unit={unit} className="weather-card" />
        )}
        <div className="forecast-view-toggle">
          <button className={`toggle-button ${view === 'daily' ? 'active' : ''}`} onClick={() => handleViewChange('daily')}>
            Daily
          </button>
          <button className={`toggle-button ${view === 'hourly' ? 'active' : ''}`} onClick={() => handleViewChange('hourly')}>
            Hourly
          </button>
        </div>
        {view === 'daily' && dailyData && (
          <DailyWeatherCard data={dailyData} unit={unit} className="weather-card" />
        )}
        {view === 'hourly' && hourlyData && (
          <HourlyWeatherCard data={hourlyData} unit={unit} className="weather-card" />
        )}
        <SavedLocations onLocationSelect={handleSearch} />
        <WeatherAlert />
        <Settings
          themeMode={themeMode}
          unit={unit}
          onThemeChange={handleThemeChange}
          onUnitChange={handleUnitChange}
        />
      </div>
    </ThemeProvider>
  );
};

const DailyWeatherCard = ({ data, unit }) => {
  return (
    <div className="daily-weather-card">
      {data.map((day, index) => (
        <div key={index} className="daily-card">
          <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
          <p>{day.temp.day}°{unit === 'metric' ? 'C' : 'F'}</p>
          <img
            src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
            alt={day.weather[0].description}
            className="weather-icon"
          />
          <p>{day.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
};

const HourlyWeatherCard = ({ data, unit }) => {
  // Ensure data and data.list are defined
  if (!data || !data.list) {
    return <p>No hourly data available.</p>;
  }

  const now = new Date();
  const currentHour = now.getHours();

  // Filter hourly data to include only the next three hours
  const filteredData = data.list.filter((hour) => {
    const hourDate = new Date(hour.dt * 1000);
    return hourDate.getHours() >= currentHour && hourDate.getHours() < currentHour + 3; // Updated to include up to the fourth hour
  });

  const temperatureUnit = unit === 'metric' ? '°C' : '°F';

  return (
    <div className="hourly-weather-card">
      {filteredData.length > 0 ? (
        filteredData.map((hour, index) => (
          <div key={index} className="hourly-card">
            <p>{new Date(hour.dt * 1000).toLocaleTimeString()}</p>
            <p>{`${Math.round(hour.main.temp)}${temperatureUnit}`}</p>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              alt={hour.weather[0].description}
              className="weather-icon"
            />
            <p>{hour.weather[0].description}</p>
          </div>
        ))
      ) : (
        <p>No data available for the next few hours.</p>
      )}
    </div>
  );
};
export default App;
