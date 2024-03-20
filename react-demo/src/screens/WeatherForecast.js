import React, { useState, useEffect } from 'react';
import '../index.css'; // Make sure to create this CSS file
import dataHandler from '../services/dataHandler';
import modelHandler from '../services/modelHandler';

const WeatherForecast = () => {
  const [tempData, setTempData] = useState([]);
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    dataHandler.getData().then((res) => {
      setFullData(res.full);
      const formattedForecast = res.split.map((item, index) => {
        const maxTemp = Math.max(...item); // Spread operator to find max
        const minTemp = Math.min(...item); // Spread operator to find min
        const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        return {
          day: dayNames[index % dayNames.length], // Cycle through day names
          high: maxTemp,
          low: minTemp
        };
      });
      setTempData(formattedForecast);
    });
  }, []);

  const buttonClick = () => {
    modelHandler.forecast();
  }

  return (
    <div className="weather-forecast">
        <div className="widgets">
        <h1 style={{color: 'white'}}>Weather Forecast - Toronto, Canada</h1>

        <div className="item-container">
      {tempData.map((dayForecast, index) => (
        <div className="forecast-item" key={index}>
          <h3>{dayForecast.day}</h3>
          <p>High: {dayForecast.high}°F</p>
          <p>Low: {dayForecast.low}°F</p>
        </div>
      ))}
      </div>

      <div>
        <button onClick={buttonClick} className="button">Forecast</button>
      </div>

        <div className="item-container">
      {tempData.map((dayForecast, index) => (
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