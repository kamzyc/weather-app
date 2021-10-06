/*
city name : api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
zip code : api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
lat and lon : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
one call : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
*/

import { API_URL, API_KEY } from "./config";
import { checkFlag } from "./helpers";

export const getWeatherFromLocation = async (query) => {
   try {
      const response = await fetch(
         `${API_URL}${checkFlag(query)}=${query}&appid=${API_KEY}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(`❌ ${data.message} ❌`);
   } catch (error) {
      console.error(error);
   }
};

// export const getWeatherFromCityName = async (cityName) => {
//    try {
//       const response = await fetch(`${API_URL}q=${cityName}&appid=${API_KEY}`);
//       const data = await response.json();

//       if (!response.ok) throw new Error(`❌ ${data.message} ❌`);
//    } catch (error) {
//       console.error(error);
//    }
// };

// export const getWeatherFromZipCode = async (zipCode) => {
//    try {
//       const response = await fetch(`${API_URL}zip=${zipCode}&appid=${API_KEY}`);
//       const data = await response.json();

//       if (!response.ok) throw new Error(`❌ ${data.message} ❌`);

//       console.log(data);
//    } catch (error) {
//       console.error(error);
//    }
// };
