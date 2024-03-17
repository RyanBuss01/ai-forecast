import React, { useState, useEffect } from 'react';
import './WeatherForecast.css'; // Make sure to create this CSS file

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
    setForecast(mockData);
  }, []);

  return (
    <div className="weather-forecast">
      {forecast.map((dayForecast, index) => (
        <div className="forecast-item" key={index}>
          <h3>{dayForecast.day}</h3>
          <p>High: {dayForecast.high}°F</p>
          <p>Low: {dayForecast.low}°F</p>
          <p>{dayForecast.condition}</p>
        </div>
      ))}
    </div>
  );
};

export default WeatherForecast;