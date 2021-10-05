"use strict";

import { API_URL, API_KEY } from "./config";

const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");

const getData = async (city) => {
   // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

   try {
      const data = await fetch(`${API_URL}q=${city}&appid=${API_KEY}`);
      const weatherData = await data.json();
      console.log(weatherData);
   } catch (err) {
      console.error(err);
   }
};

getData("Paris");
