import React, { useEffect, useState } from 'react';
import SearchBar from '../components/searchBar';
import SavedLocations from '../components/savedLocations';
import WeatherAlert from '../components/weatherAlert';
import WeatherCard from '../components/weatherCard';
import DailyWeatherCard from '../components/dailyWeatherCard';
import HourlyWeatherCard from '../components/hourlyWeatherCard';
import useWeather from '../Hooks/useWeather';

const Home = ({ unit, setUnit, view, setView }) => {
  const { weatherData, hourlyData, fetchWeather, fetchWeatherByCoords } = useWeather();
  const [savedLocations, setSavedLocations] = useState(() => {
    const saved = localStorage.getItem('savedLocations');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchWeatherByCoords(position.coords.latitude, position.coords.longitude, unit);
    });
  }, [unit, fetchWeatherByCoords]);

  const handleSearch = (location) => {
    fetchWeather(location, unit);
    if (!savedLocations.includes(location)) {
      const updatedLocations = [...savedLocations, location];
      setSavedLocations(updatedLocations);
      localStorage.setItem('savedLocations', JSON.stringify(updatedLocations));
    }
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      {weatherData && <WeatherCard data={weatherData} unit={unit} />}
      <div className="forecast-view-toggle">
        <button className={`toggle-button ${view === 'daily' ? 'active' : ''}`} onClick={() => setView('daily')}>
          Daily
        </button>
        <button className={`toggle-button ${view === 'hourly' ? 'active' : ''}`} onClick={() => setView('hourly')}>
          Hourly
        </button>
      </div>
      {view === 'daily' && hourlyData && <DailyWeatherCard data={hourlyData} unit={unit} />}
      {view === 'hourly' && hourlyData && <HourlyWeatherCard data={hourlyData} unit={unit} />}
      <SavedLocations locations={savedLocations} onLocationSelect={handleSearch} />
      <WeatherAlert />
    </div>
  );
};

export default Home;
