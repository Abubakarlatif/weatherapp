import React, { useState } from "react";
import "./app.css";
const api = {
  key :"7c5a01657e2b86dfc8a7bef93bf29444",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query , setQuery] = useState('');
  const [weather , setWeather] = useState({});
  const search = evt=>{
    if(evt.key == "Enter")
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result)
        setQuery('');
        console.log(result);
      });
  } 
  const dateBuilder=(d)=>{
    let months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
    let days =["sunday","monday","tuesday","wednesday","thursday","friday","saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main !== "undefined") ? ((weather.main.temp > 20 ) ? 'App warm' : 'App' ) : 'App'}>
    <main>
      <div className="search-box">
      <input 
      type="text"
      placeholder="Search...."
      className="search-bar"
      onChange={e=> setQuery(e.target.value)}
      value={query}
      onKeyPress={search}

      ></input>
      </div>
      {typeof weather.main !== "undefined" ? (
  <>
    <div className="location-box">
      <div className="location">
        {weather.name}, {weather.sys.country}
      </div>
      <div className="Date">{dateBuilder(new Date())}</div>
    </div>
    <div className="weather-box">
      <div className="temp">{Math.round(weather.main.temp)}°C</div>
      <div className="weather">{weather.weather[0].description}</div>
    </div>
  </>
) : (
  ""
)}

     </main>
    </div>
  );
}

export default App;
