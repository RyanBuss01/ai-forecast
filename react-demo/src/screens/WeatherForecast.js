import React, { useState, useEffect } from 'react';
import '../index.css'; // Make sure to create this CSS file
import dataHandler from '../services/dataHandler';

const WeatherForecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    // Here you would fetch the weather data from an API
    // For demonstration, I'll use mock data
    const mockData = [
      { day: 'Monday', high: 75, low: 55, condition: 'Sunny' },
      { day: 'Tuesday', high: 70, low: 50, condition: 'Cloudy' },
      { day: 'Wednesday', high: 65, low: 48, condition: 'Rain' },
      { day: 'Thursday', high: 60, low: 45, condition: 'Thunderstorm' },
      { day: 'Friday', high: 68, low: 50, condition: 'Partly Cloudy' },
      { day: 'Saturday', high: 72, low: 54, condition: 'Sunny' },
      { day: 'Sunday', high: 75, low: 56, condition: 'Sunny' },
    ];
    let data = dataHandler.getData();
    setForecast(mockData);
  }, []);

  return (
    <div className="weather-forecast">
        <div className="widgets">
        <h1 style={{color: 'white'}}>Weather Forecast</h1>

        <div className="item-container">
      {forecast.map((dayForecast, index) => (
        <div className="forecast-item" key={index}>
          <h3>{dayForecast.day}</h3>
          <p>High: {dayForecast.high}°F</p>
          <p>Low: {dayForecast.low}°F</p>
        </div>
      ))}
      </div>

      <div>
        <button className="button">Click me</button>
      </div>

        <div className="item-container">
      {forecast.map((dayForecast, index) => (
        <div className="forecast-item" key={index}>
          <h3>{dayForecast.day}</h3>
          <p>High: {dayForecast.high}°F</p>
          <p>Low: {dayForecast.low}°F</p>
        </div>
      ))}
      </div>


      </div>
    </div>
  );
};

export default WeatherForecast;