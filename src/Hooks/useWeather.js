import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  const fetchWeather = async (location, unit) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error.response || error.message);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const fetchWeatherByCoords = async (lat, lon, unit) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setWeatherData(response.data);
      await fetchHourlyWeatherByCoords(lat, lon, unit); // Fetch forecast data after getting current weather
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error.response || error.message);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const fetchHourlyWeather = async (location, unit) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setHourlyData(response.data);
    } catch (error) {
      console.error('Error fetching hourly weather data:', error.response || error.message);
      alert('Error fetching hourly weather data. Please try again.');
    }
  };
  
  const fetchHourlyWeatherByCoords = async (lat, lon, unit) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
      );
      setHourlyData(response.data);
    } catch (error) {
      console.error('Error fetching hourly weather data by coordinates:', error.response || error.message);
      alert('Error fetching hourly weather data. Please try again.');
    }
  };
  return {
    weatherData,
    hourlyData,
    fetchWeather,
    fetchHourlyWeather,
    fetchWeatherByCoords,
    fetchHourlyWeatherByCoords
  };
};

export default useWeather;
