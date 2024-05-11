import React, { useEffect, useState } from "react";
import "./WeatherApp.css";

import search_icon from "../Assets/search.png";
import humidity_icon from "../Assets/humidity.png";
import wind_icon from "../Assets/wind.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState({
    humidity: "",
    windSpeed: "",
    temperature: "",
    location: "",
  });

  const fetchWeatherData = async (city) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=54e971ae2eeabad243e4db7eae8afc91`;

      let response = await fetch(url);
      let data = await response.json();

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: Math.round(data.wind.speed),
        temperature: Math.round(data.main.temp),
        location: data.name,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData("Taraz");
  }, []);

  const search = () => {
    const element = document.getElementsByClassName("cityInput");
    if (element[0].value === "") {
      return 0;
    }
    fetchWeatherData(element[0].value);
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      <div className="weather-image">
        <img src={cloud_icon} alt="" srcset="" />
      </div>
      <div className="weather-temp">{weatherData.temperature}°C</div>
      <div className="weather-location">{weatherData.location}</div>
      <div className="data-container">
        <div className="element">
          <img src={humidity_icon} alt="" />
          <div className="data">
            <div className="humidity-percent">{weatherData.humidity}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind_icon} alt="" />
          <div className="data">
            <div className="wind-rate">{weatherData.windSpeed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
