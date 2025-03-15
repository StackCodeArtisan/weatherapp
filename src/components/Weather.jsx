import React, { useEffect, useState, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search_icon.png';
import cloudy_icon from '../assets/cloudy_icon.png';
import drizzle_icon from '../assets/drizzle_icon.png';
import humidity_icon from '../assets/humidity_icon.png';
import rain_icon from '../assets/rain_icon.png';
import sun_icon from '../assets/sun_icon.png';
import wind_icon from '../assets/wind_icon.png';
import snow_icon from '../assets/snow_icon.png';

const Weather = () => {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": sun_icon,
    "01n": sun_icon,
    "02d": cloudy_icon,
    "02n": cloudy_icon,
    "03d": cloudy_icon,
    "03n": cloudy_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "11d": snow_icon,
    "11n": snow_icon,
  };

  const search = async (city) => {
    if (city === '') {
      alert('Enter City Name');
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sun_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search('Lagos');
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search..." />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>

      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather Icon" className="weather-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" width={50} height={50} />
              <div>
                <p>{weatherData.humidity}</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind" width={50} height={50} />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
