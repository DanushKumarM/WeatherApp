import React, { useState } from 'react'
import './style.css';
import cloudy from '../assets/cloudy.png';
import rainy from '../assets/rainy-day.png';
import snow from '../assets/snow.png';
import storm from '../assets/storm.png';
import sun from '../assets/sun.png';
import defaultWeather from '../assets/weather.png'; // fallback icon



const Weather = () => {

    const weatherIcons = {
        Clouds: cloudy,
        Rain: rainy,
        Snow: snow,
        Thunderstorm: storm,
        Clear: sun,
      };
      

    let [weatherData, setWeatherData] = useState("");
    let [city, setCity] = useState(null);

    let fetchApi = async() => {
        let apikey = process.env.REACT_APP_API_KEY;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric
`
        try {
            let data = await fetch(apiUrl)
            let finalData = await  data.json();

            if(finalData.cod === 200) {  // Check finalData.cod, not finalData itself
                console.log(finalData);
                setWeatherData(finalData);
            } else {
                alert("City not found: " + (finalData.message || "Unknown error"));
            }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='weather-container'>
    <h1>Weather App</h1>
    <input 
        type="text" 
        placeholder='Enter city name' 
        onChange={(e) => setCity(e.target.value)} 
    />
    <button onClick={fetchApi}>Search</button>

    {weatherData.name && (
        <div className='card'>
            <h2>{weatherData.name}</h2>

             {/* Dynamic Weather Image */}
    {weatherData.weather?.[0]?.main && (
        <img 
            src={
                {
                    Clouds: cloudy,
                    Rain: rainy,
                    Snow: snow,
                    Thunderstorm: storm,
                    Clear: sun,
                }[weatherData.weather[0].main] || defaultWeather
            } 
            alt={weatherData.weather[0].main} 
            className="weather-icon" 
        />
    )}
            {weatherData.main?.temp && <h3>{weatherData.main.temp}°C</h3>}
            {weatherData.weather?.[0]?.main && <h4>{weatherData.weather[0].main}</h4>}
            {weatherData.weather?.[0]?.description && <p>{weatherData.weather[0].description}</p>}
        </div>
    )}
</div>

  )
}

export default Weather