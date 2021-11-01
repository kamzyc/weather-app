import currentLocation from "./currentLocation";
import {
   getCurrentWeatherFromCoords,
   getCurrentWeatherFromSearch,
   setLocation,
   getCurrentPosition,
   getHourlyAndDailyWeather,
} from "./data";
import * as view from "./views/view";

function init() {
   // add handlers
   view.searchForm.addEventListener("submit", searchHandler);
   view.geoBtn.addEventListener("click", geoHandler);
   view.syncBtn.addEventListener("click", syncHandler);
   view.unitsSwitcher.addEventListener("change", switchUnitsHandler);

   // disable sync button at launch (when there is no location saved)
   if (!currentLocation.lon && !currentLocation.lat) {
      view.syncBtn.classList.add("btn--disabled");
      view.unitsSwitcher.parentElement.classList.add("btn--disabled");
   }

   // simulate click on geo btn
   view.geoBtn.click();
}

const searchHandler = async (event) => {
   event.preventDefault();
   view.showSpinner();
   try {
      // get coords, time and current weather
      const { coords, weather, timeData } = await getCurrentWeatherFromSearch(
         view.searchInput.value,
         currentLocation.units
      );

      // set location
      setLocation(currentLocation, coords);

      // get hourly and daily weather
      const { hourly, daily } = await getHourlyAndDailyWeather(currentLocation);

      // update view
      view.updateView(currentLocation, timeData, weather, hourly, daily);

      // clear input
      view.searchInput.value = "";
   } catch (error) {
      console.error(error.message);
      view.showError(error.message);
   }
};

const syncHandler = async () => {
   view.showSpinner();
   try {
      // get current weather and time
      const { weather, timeData } = await getCurrentWeatherFromCoords(
         currentLocation
      );

      // get hourly and daily weather
      const { hourly, daily } = await getHourlyAndDailyWeather(currentLocation);

      // update view
      view.updateView(currentLocation, timeData, weather, hourly, daily);
   } catch (error) {
      console.error(error);
      view.showError(error.message);
   }
};

const geoHandler = async () => {
   view.showSpinner();
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

      // get current weather and time
      const { weather, timeData } = await getCurrentWeatherFromCoords(
         currentLocation
      );

      // get hourly and daily weather
      const { hourly, daily } = await getHourlyAndDailyWeather(currentLocation);

      // update view
      view.updateView(currentLocation, timeData, weather, hourly, daily);
   } catch (error) {
      console.error(error);
      view.showError(error.message);
   }
};

const switchUnitsHandler = () => {
   currentLocation.swapUnits();

   // simulate click on sync btn
   view.syncBtn.click();
};

init();
