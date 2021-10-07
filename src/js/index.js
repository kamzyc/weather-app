"use strict";

import currentLocation from "./currentLocation";
import { getDataFromLocation, getWeatherFromCoords, setLocation } from "./data";
import * as dom from "./dom";

// getWeatherFromCityName("London");
// getWeatherFromZipCode(46580);

dom.searchForm.addEventListener("submit", async (event) => {
   event.preventDefault();

   try {
      const locationData = await getDataFromLocation(
         dom.searchInput.value,
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
