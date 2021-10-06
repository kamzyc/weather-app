"use strict";

import currentWeather from "./currentWeather";
import { getWeatherFromLocation, getWeatherFromCoords } from "./data";

// getWeatherFromCityName("London");
// getWeatherFromZipCode(46580);

const coordsWeather = async () => {
   const lat = 52.237049;
   const lon = 21.017532;

   currentWeather.lat = lat;
   currentWeather.lon = lon;

   try {
      const weather = await getWeatherFromCoords(currentWeather);
      console.log(weather);
   } catch (error) {
      console.error(error);
   }
};

const locationWeather = async () => {
   try {
      const weather = await getWeatherFromLocation("London");
      console.log(weather);
   } catch (error) {
      console.error(error);
   }
};

locationWeather();
