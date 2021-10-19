import currentLocation from "./currentLocation";
import {
   getCurrentWeatherFromSearch,
   getWeatherFromCoords,
   setLocation,
} from "./data";
import * as dom from "./dom";

const init = () => {
   // add handlers
   dom.searchForm.addEventListener("submit", searchHandler);
};

const searchHandler = async (event) => {
   event.preventDefault();

   try {
      // get coords and current weather
      const currentWeather = await getCurrentWeatherFromSearch(
         dom.searchInput.value,
         currentLocation.units
      );

      // set location
      setLocation(currentLocation, currentWeather.coord);

      // update view
      dom.updateView(currentLocation, currentWeather.weather);
   } catch (error) {
      console.error(error);
   }
};

init();
