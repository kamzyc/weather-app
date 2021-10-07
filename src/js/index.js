"use strict";

import currentLocation from "./currentLocation";
import { getDataFromLocation, getWeatherFromCoords, setLocation } from "./data";
import * as dom from "./dom";

export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");

// getWeatherFromCityName("London");
// getWeatherFromZipCode(46580);

searchForm.addEventListener("submit", async (event) => {
   event.preventDefault();

   try {
      const locationData = await getDataFromLocation(
         searchInput.value,
         currentLocation.units
      );

      const locationWeather = await getWeatherFromCoords({
         ...locationData,
         units: currentLocation.units,
      });

      setLocation(currentLocation, { ...locationData });
   } catch (error) {
      console.error(error);
   }
});
