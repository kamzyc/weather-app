"use strict";

// DOM elements
export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");
export const currentWeather = document.querySelector(".current-weather");

/*
<main class="current-weather">
      <h2 class="current-weather__title">Current location</h2>

      <div class="current-weather__temp">10</div>
      <div class="current-weather__description">Cloudy</div>
      <div class="current-weather__max-min">
         <span class="max">10</span>
         <span class="min">2</span>
      </div>
   </main>
*/

const clearElem = (element) => {
   element.querySelectorAll("*").forEach((children) => children.remove());
};

const createElem = (tag = "div", className, content) => {
   const element = document.createElement(tag);
   element.classList.add(className);
   element.innerText = content;
   return element;
};

const appendElem = (element, parent) => {
   console.log(element);
   parent.append(element);
};

export const updateView = (location, weather) => {
   console.log("Updating view...");
   console.log(location);
   console.log(weather);

   const temp = weather.current.temp;
   const pressure = weather.current.pressure;
   const humidity = weather.current.humidity;
   const description = weather.current.weather[0].description;
   const wind = weather.current.wind_speed;
   const windDeg = weather.current.wind_deg;
};
