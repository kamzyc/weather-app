"use strict";

import currentLocation from "./currentLocation";
import {
   getCurrentWeatherFromSearch,
   getWeatherFromCoords,
   setLocation,
} from "./data";
import * as dom from "./dom";

// getWeatherFromCityName("London");
// getWeatherFromZipCode(46580);

// dom.searchForm.addEventListener("submit", async (event) => {
//    event.preventDefault();

//    try {
//       const locationData = await getCoordsFromLocation(
//          dom.searchInput.value,
//          currentLocation.units
//       );

//       const locationWeather = await getWeatherFromCoords({
//          ...locationData,
//          units: currentLocation.units,
//       });

//       setLocation(currentLocation, { ...locationData });
//    } catch (error) {
//       console.error(error);
//    }
// });

const init = () => {
   console.log("Init");
   // add handlers
   dom.searchForm.addEventListener("submit", searchHandler);
};

const searchHandler = async (event) => {
   event.preventDefault();
   console.log("Searching...");
   try {
      // get coords and current weather
      const weather = await getCurrentWeatherFromSearch(
         dom.searchInput.value,
         currentLocation.units
      );

      console.log(weather);

      // set location
      // setLocation(currentLocation, coords);

      // update view
      // dom.updateView(currentLocation, weather);
   } catch (error) {
      console.error(error);
   }
};

init();
