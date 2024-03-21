import React, { useState, useEffect } from 'react';
import '../index.css'; // Make sure to create this CSS file
import dataHandler from '../services/dataHandler';
import modelHandler from '../services/modelHandler';

const WeatherForecast = () => {
  const [tempData, setTempData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [dotCount, setDotCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingIteration, setloadingIteration] = useState(0);
  const [showSecondContainer, setShowSecondContainer] = useState(false); // New state variable for toggling visibility

  const dots = '.'.repeat(dotCount)

  const formatData = (res) => {
    return res.split.map((item, index) => {
      const maxTemp = Math.max(...item); // Spread operator to find max
      const minTemp = Math.min(...item); // Spread operator to find min
      const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return {
        day: dayNames[index % dayNames.length], // Cycle through day names
        high: dataHandler.fahrenheitConvert(maxTemp),
        low: dataHandler.fahrenheitConvert(minTemp)
      };
    });
  }

  useEffect(() => {
    let intervalId;

    dataHandler.getData().then((res) => {
      setFullData(res.full);
      const formattedForecast = formatData(res);
      setTempData(formattedForecast);
    });
    if (isLoading) {
      intervalId = setInterval(() => {
        setDotCount((prevCount) => (prevCount === 5 ? 1 : prevCount + 1));
      }, 1000); // Update every second
    }
    return () => clearInterval(intervalId);
  }, [isLoading]);

  const buttonClick = () => {
    setIsLoading(true)
    modelHandler.forecast(fullData, setloadingIteration).then((res) => {
      const formattedForecast = formatData(res);
      console.log('formattedForecast:', formattedForecast);
      setForecastData(formattedForecast);
      setIsLoading(false);
      setShowSecondContainer(true); // Toggle visibility on button click
    });
  }

  return (
    <>
    <div className="weather-forecast"></div>
    <div className='widgets-container'>
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
        {!isLoading && !showSecondContainer ?
      <div>
        <button onClick={buttonClick} className="button">Forecast</button>
      </div>
      : isLoading && !showSecondContainer ?
      <div className="loading-container">
          <p>{isLoading ? `Running Prediction Model ${loadingIteration} / 168 ${dots} ` : ''}</p>
        </div>
      : <h1 style={{color: 'white'}}>Next Week Forecast</h1>
      }
        <div className={`item-container ${!showSecondContainer ? 'hidden' : ''}`}>
      {forecastData.map((dayForecast, index) => (
        <div className="forecast-item" key={index}>
          <h3>{dayForecast.day}</h3>
          <p>High: {dayForecast.high}°F</p>
          <p>Low: {dayForecast.low}°F</p>
        </div>
      ))}
      </div>

      </div>
      </div>
      </>
    
  );
};

export default WeatherForecast;
