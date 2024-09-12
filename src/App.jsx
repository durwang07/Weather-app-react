

import { useState } from 'react';
import './App.css'

function App() {

  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState();
  

  async function handleButtonClick(){
    console.log(city);

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const todayDate = date.getDate();

    //year-month-date

    const today = `${year}-${month +1}-${todayDate}`;
    console.log(city)
    console.log(today)

   try{
    const response =  await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${today}?unitGroup=us&key=YFPJKFT4UGEYSR43AN4B6ZK9V&contentType=json`);

   const data = await response.json();

   setWeatherData(data);
   console.log(data);
   }
   catch (error){
        console.log(error)
   }
  }


  return(
    <div className='container'>
      <input type="text" 
      placeholder='Enter City' 
      onChange={(e) => setCity(e.target.value)}/>
      <button onClick={() => handleButtonClick()}>Search</button>
      <h1>City : {weatherData?.address}</h1>
      <h2>Temp:{weatherData?.currentConditions.humidity } </h2>
      <h2>Conditions: {weatherData?.currentConditions.conditions}</h2>
      <h2>Cloud cover:{weatherData?.currentConditions.cloudcover} </h2>
      <h2>Snow: {weatherData?.currentConditions.snow}</h2>
      <h2></h2>
    </div>
  );
  
}

export default App
