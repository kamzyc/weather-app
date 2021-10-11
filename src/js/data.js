/*
city name : api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
zip code : api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
lat and lon : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
one call : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
*/

import { API_URL, API_KEY } from "./config";

const setFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "q";
};

const formatName = (name) => {
   return name
      .split("_")
      .map((word, i) =>
         i === 0 ? word : word[0].toUpperCase() + word.slice(1)
      )
      .join("");
};

export const getCurrentWeatherFromSearch = async (searchName, units) => {
   try {
      const response = await fetch(
         `${API_URL}${setFlag(
            searchName
         )}=${searchName}&units=${units}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(`❌ ${data.message} ❌`);

      const weather = {
         name: data.name,
         cords: data.coord,
         main: data.main,
         wind: data.wind,
      };

      console.log(weather);
      return weather;
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
   const { name, lat, lon, units } = newLocation;
   location.name = name;
   location.lat = lat;
   location.lon = lon;
   if (units) location.units = units;
};
