import currentLocation from "./currentLocation";
import { getCurrentWeatherFromSearch, setLocation } from "./data";
import * as dom from "./dom";

const init = () => {
   // add handlers
   dom.searchForm.addEventListener("submit", searchHandler);
   dom.geoBtn.addEventListener("click", geoHandler);
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
      setLocation(currentLocation, currentWeather.coords);

      // update view
      dom.updateView(currentLocation, currentWeather.weather);
   } catch (error) {
      console.error(error);
   }
};

const setNewCurrentPositon = () => {
   try {
      if (!navigator.geolocation) geoError();
      navigator.geolocation.getCurrentPosition((position) => {
         geoSuccess(position);
      }, geoError);
   } catch (error) {
      console.error(error);
   }
};

const geoError = () => {
   throw new Error("No access to gps");
};

const geoSuccess = (position) => {
   const newLocation = {
      name: "Current position",
      lat: position.coords.latitude,
      lon: position.coords.longitude,
   };

   setLocation(currentLocation, newLocation);
};

const geoHandler = () => {
   setNewCurrentPositon();
};

init();
