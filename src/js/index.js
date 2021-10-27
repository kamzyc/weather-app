import currentLocation from "./currentLocation";
import {
   getCurrentWeatherFromCoords,
   getCurrentWeatherFromSearch,
   setLocation,
   getCurrentPosition,
   getHourlyAndDailyWeather,
} from "./data";
import * as dom from "./dom";

const init = () => {
   // add handlers
   dom.searchForm.addEventListener("submit", searchHandler);
   dom.geoBtn.addEventListener("click", geoHandler);
   dom.syncBtn.addEventListener("click", syncHandler);
};

const searchHandler = async (event) => {
   event.preventDefault();

   try {
      // get coords and current weather
      const { coords, weather } = await getCurrentWeatherFromSearch(
         dom.searchInput.value,
         currentLocation.units
      );

      // set location
      setLocation(currentLocation, coords);

      // get hourly and daily weather
      const { hourly, daily } = await getHourlyAndDailyWeather(currentLocation);

      // update view
      dom.updateView(currentLocation, weather, hourly);
   } catch (error) {
      console.error(error);
   }
};

const syncHandler = async () => {
   try {
      // get current weather
      const { weather } = await getCurrentWeatherFromCoords(currentLocation);

      // get hourly and daily weather
      const { hourly, daily } = await getHourlyAndDailyWeather(currentLocation);

      // update view
      dom.updateView(currentLocation, weather, hourly);
   } catch (error) {
      console.error(error);
   }
};

const geoHandler = async () => {
   console.log("Geolocation weather...");

   try {
      // get current coords
      const { coords } = await getCurrentPosition();
      const currentCoords = {
         name: "Current location",
         lat: coords.latitude,
         lon: coords.longitude,
      };

      // set location
      setLocation(currentLocation, currentCoords);

      // get current weather
      const { weather } = await getCurrentWeatherFromCoords(currentLocation);

      // get hourly and daily weather
      const { hourly, daily } = await getHourlyAndDailyWeather(currentLocation);

      // update view
      dom.updateView(currentLocation, weather, hourly);
   } catch (error) {
      console.error(error);
   }
};

init();
