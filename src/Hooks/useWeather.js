import { useState } from 'react';
import axios from 'axios';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [dailyData, setDailyData] = useState(null);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; 

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
      );
      console.log(response.data); 
      setWeatherData(response.data);
      await fetchHourlyWeather(location);
      await fetchDailyWeather(location);
    } catch (error) {
      console.error('Error fetching weather data:', error.response ? error.response.data : error.message);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${lat},${lon}`
      );
      console.log(response.data); 
      setWeatherData(response.data);
      await fetchHourlyWeatherByCoords(lat, lon);
      await fetchDailyWeatherByCoords(lat, lon);
    } catch (error) {
      console.error('Error fetching weather data by coordinates:', error.response ? error.response.data : error.message);
      alert('Error fetching weather data. Please try again.');
    }
  };

  const fetchHourlyWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&hours=24`
      );
      setHourlyData(response.data.forecast.forecastday[0].hour);
    } catch (error) {
      console.error('Error fetching hourly weather data:', error.response ? error.response.data : error.message);
      alert('Error fetching hourly weather data. Please try again.');
    }
  };

  const fetchHourlyWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&hours=24`
      );
      setHourlyData(response.data.forecast.forecastday[0].hour);
    } catch (error) {
      console.error('Error fetching hourly weather data by coordinates:', error.response ? error.response.data : error.message);
      alert('Error fetching hourly weather data. Please try again.');
    }
  };

  const fetchDailyWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
      );
      setDailyData(response.data.forecast.forecastday);
    } catch (error) {
      console.error('Error fetching daily weather data:', error.response ? error.response.data : error.message);
      alert('Error fetching daily weather data. Please try again.');
    }
  };

  const fetchDailyWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7`
      );
      setDailyData(response.data.forecast.forecastday);
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
