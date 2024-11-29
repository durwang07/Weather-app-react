import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const apiKey = 'YFPJKFT4UGEYSR43AN4B6ZK9V';

  async function handleButtonClick() {
    if (!city) {
      setStatusMessage("Please enter a city name.");
      setWeatherData(null); 
      return;
    }

    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let todayDate = date.getDate();

    if (month < 10) {
      month = '0' + month;
    }
    if (todayDate < 10) {
      todayDate = '0' + todayDate;
    }

    const today = `${year}-${month}-${todayDate}`;

    try {
      setLoading(true);
      setStatusMessage(null); 

      const response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${today}?unitGroup=us&key=${apiKey}&contentType=json`
      );

      if (!response.ok) {
        throw new Error("Unable to find weather data for the specified city.");
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setWeatherData(null);
      setStatusMessage("Unable to find weather data for the specified city or wrong input entered. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter City Name"
        onChange={(e) => setCity(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleButtonClick}>Search</button>
      <br />
      <br />

      {loading && <p>Fetching weather data...</p>}

      {statusMessage && <p style={{ color: 'red' }}>{statusMessage}</p>}

      {weatherData && !statusMessage && (
        <>
          <h1>City: {weatherData?.resolvedAddress}</h1>
          <h1>Temperature: {weatherData.currentConditions?.temp} °F</h1>
          <h1>Humidity: {weatherData.currentConditions?.humidity} %</h1>
          <h1>Conditions: {weatherData.currentConditions?.conditions}</h1>
          <h1>Description: {weatherData?.description}</h1>
        </>
      )}
    </div>
  );
}

export default App;