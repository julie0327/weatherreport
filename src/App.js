import React, { useState } from "react";

import './index.css'

const api = {
  key: "c3329660991e7623b91ee96da227aa92",
  base: "https://api.openweathermap.org/data/2.5/"
}
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const days = ['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'];

function App() {
  const [query, setQuery] = useState('')
  const [weather, setWeather] = useState('')
  function search(event) {
    if (event.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('')
        })
    }
  }

  function _dateBuilder(d) {

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  function newQuery(event) {
    setQuery(event.target.value)
  }
  function weatherIcons() {

  }
  return (
    <div className={
      (typeof weather.name != 'undefined') ? (weather.main.temp >= 15 ? 'app warm' : 'app cold') : 'app'
    }>
      <main>

        <div className="search-box">
          <input
            type='text'
            className="search-bar"
            placeholder="Search..."
            onChange={newQuery}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.name != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name},{weather.sys.country}</div>
              <div className="date">{_dateBuilder(new Date())}</div>

            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : ('')}

      </main>
    </div>
  );
}

export default App;
