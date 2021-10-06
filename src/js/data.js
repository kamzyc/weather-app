/*
city name : api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
zip code : api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
lat and lon : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
one call : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
*/

import { API_URL, API_KEY } from "./config";
import { setFlag } from "./helpers";

export const getWeatherFromLocation = async (query, units) => {
   try {
      const response = await fetch(
         `${API_URL}${setFlag(query)}=${query}&units=${units}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(`❌ ${data.message} ❌`);
      return data;
   } catch (error) {
      throw error;
   }
};

export const getWeatherFromCoords = async ({ lat, lon, units }) => {
   try {
      const response =
         await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=${units}&appid=${API_KEY}
      `);
      const data = await response.json();

      if (!response.ok) throw new Error(`❌ ${data.message} ❌`);
      return data;
   } catch (error) {
      throw error;
   }
};

export const setLocation = (location, newLocation) => {
   const { lat, lon, name, unit } = newLocation;
   location.lat = lat;
   location.lon = lon;
   location.name = name;

   if (unit) location.unit = unit;
};
