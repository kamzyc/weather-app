/*
city name : api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
zip code : api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}
lat and lon : api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
one call : https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
daily : api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
hourly : pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
*/

import {
   API_URL,
   API_KEY,
   NUM_HOURS,
   NUM_DAYS,
   MIN_IN_HOUR,
   SEC_IN_MIN,
} from "./config";
import { setFlag } from "./utilities";

const convertToWeatherObject = (data) => {
   return {
      coords: { ...data.coord, name: data.name },
      weather: {
         temp: {
            main: Math.round(data.main.temp),
            max: Math.round(data.main.temp_max),
            min: Math.round(data.main.temp_min),
         },
         humidity: data.main.humidity,
         pressure: data.main.pressure,
         wind: { angle: data.wind.deg, speed: data.wind.speed },
         description: data.weather[0].description,
         id: data.weather[0].id,
         timezone: data.timezone / MIN_IN_HOUR / SEC_IN_MIN,
         sunrise: new Date(data.sys.sunrise * 1000),
         sunset: new Date(data.sys.sunset * 1000),
      },
   };
};

const convertToHourlyObject = (data) => {
   const hourly = data.slice(0, NUM_HOURS).map((hour) => {
      return {
         time: new Date(hour.dt * 1000),
         temp: Math.round(hour.temp),
         description: hour.weather[0].description,
         id: hour.weather[0].id,
      };
   });

   return hourly;
};

const convertToDailyObject = (data) => {
   const daily = data.slice(1, NUM_DAYS).map((day) => {
      return {
         time: new Date(day.dt * 1000),
         temp: {
            main: Math.round(day.temp.day),
            max: Math.round(day.temp.max),
            min: Math.round(day.temp.min),
         },
         description: day.weather[0].description,
         id: day.weather[0].id,
      };
   });

   return daily;
};

const getWeatherData = async (response) => {
   try {
      const data = await response.json();
      if (!response.ok) throw new Error(`❌ ${data.message} ❌`);
      const weatherData = convertToWeatherObject(data);
      return weatherData;
   } catch (error) {
      throw error;
   }
};

export const getCurrentWeatherFromSearch = async (searchName, units) => {
   try {
      const response = await fetch(
         `${API_URL}weather?${setFlag(
            searchName
         )}=${searchName}&units=${units}&appid=${API_KEY}`
      );

      const weather = await getWeatherData(response);
      console.log(weather);
      return weather;
   } catch (error) {
      throw error;
   }
};

export const getCurrentWeatherFromCoords = async ({ lat, lon, units }) => {
   try {
      const response = await fetch(
         `${API_URL}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      const weather = await getWeatherData(response);
      console.log(weather);
      return weather;
   } catch (error) {
      throw error;
   }
};

export const getHourlyAndDailyWeather = async ({ lat, lon, units }) => {
   try {
      const response = await fetch(
         `${API_URL}onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,alerts&units=${units}&appid=${API_KEY}`
      );

      const data = await response.json();
      if (!response.ok) throw new Error(`❌ ${data.message} ❌`);

      const hourly = convertToHourlyObject(data.hourly);
      const daily = convertToDailyObject(data.daily);
      console.log(hourly);

      return { hourly, daily };
   } catch (error) {
      throw error;
   }
};

export const setLocation = (location, { name, lat, lon, units }) => {
   location.name = name;
   location.lat = lat;
   location.lon = lon;
   if (units) location.units = units;
};

export const getCurrentPosition = () => {
   return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
   });
};
