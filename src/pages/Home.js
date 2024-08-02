import React, { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';
import SearchBar from '../components/SearchBar';
import SavedLocations from '../components/SavedLocations';
import axios from 'axios';

const Home = ({ unit }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState(''); 

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error(error);
        alert('Unable to fetch your location. Please enter a location manually.');
      }
    );
  }, []);

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data', error);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const fetchWeatherByLocation = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
      setLocation(location);
    } catch (error) {
      console.error('Error fetching weather data', error);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const handleSearch = (location) => {
    fetchWeatherByLocation(location);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {weatherData && <WeatherCard data={weatherData} unit={unit} />}
      <SavedLocations onLocationSelect={fetchWeatherByLocation} />
    </div>
  );
};

export default Home;
