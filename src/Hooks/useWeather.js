import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 

  const fetchWeather = async (location, unit) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?city=${location}&units=${unit}&key=${API_KEY}`
      );
      console.log(response.data); 
      setWeatherData(response.data);
      await fetchHourlyWeather(location, unit);
      await fetchDailyWeather(location, unit); // Ensure dailyData is set
    } catch (error) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      alert('Error fetching weather data. Please try again.');
    }
  };

  // Fetch weather by coordinates
  const fetchWeatherByCoords = async (lat, lon, unit) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&units=${unit}&key=${API_KEY}`
      );
      console.log(response.data); 
      setWeatherData(response.data);
      await fetchHourlyWeatherByCoords(lat, lon, unit); 
      await fetchDailyWeatherByCoords(lat, lon, unit);  
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error.response ? error.response.data : error.message);
      alert('Error fetching weather data. Please try again.');
    }
  };

  // Fetch hourly weather
  const fetchHourlyWeather = async (location, unit) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?city=${location}&units=${unit}&key=${API_KEY}`
      );
      setHourlyData(response.data);
    } catch (error) {
      console.error('Error fetching hourly weather data:', error.response ? error.response.data : error.message);
      alert('Error fetching hourly weather data. Please try again.');
    }
  };

  // Fetch hourly weather by coordinates
  const fetchHourlyWeatherByCoords = async (lat, lon, unit) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/hourly?lat=${lat}&lon=${lon}&units=${unit}&key=${API_KEY}`
      );
      setHourlyData(response.data);
    } catch (error) {
      console.error('Error fetching hourly weather data by coordinates:', error.response ? error.response.data : error.message);
      alert('Error fetching hourly weather data. Please try again.');
    }
  };

  // Fetch daily weather
  const fetchDailyWeather = async (location, unit) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&units=${unit}&key=${API_KEY}`
      );
      setDailyData(response.data);
    } catch (error) {
      console.error('Error fetching daily weather data:', error.response ? error.response.data : error.message);
      alert('Error fetching daily weather data. Please try again.');
    }
  };

  // Fetch daily weather by coordinates
  const fetchDailyWeatherByCoords = async (lat, lon, unit) => {
    try {
      const response = await axios.get(
        `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&units=${unit}&key=${API_KEY}`
      );
      setDailyData(response.data);
    } catch (error) {
      console.error('Error fetching daily weather data by coordinates:', error.response ? error.response.data : error.message);
      alert('Error fetching daily weather data. Please try again.');
    }
  };

  return {
    weatherData,
    hourlyData,
    dailyData,
    fetchWeather,
    fetchWeatherByCoords,
    fetchHourlyWeather,
    fetchHourlyWeatherByCoords,
    fetchDailyWeather,
    fetchDailyWeatherByCoords
  };
};

export default useWeather;
