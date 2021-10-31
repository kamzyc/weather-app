import {
   API_URL,
   API_KEY,
   NUM_HOURS,
   NUM_DAYS,
   MIN_IN_HOUR,
   SEC_IN_MIN,
} from "./config";
import { convertDate, setFlag } from "./utilities";
import { syncBtn } from "./views/view";

const convertToWeatherObject = (data) => {
   const weatherObject = {
      coords: { ...data.coord, name: data.name },
      weather: {
         temp: {
            main: Math.round(data.main.temp),
            max: Math.round(data.main.temp_max),
            min: Math.round(data.main.temp_min),
            feelsLike: Math.round(data.main.feels_like),
         },
         humidity: data.main.humidity,
         pressure: data.main.pressure,
         wind: { angle: data.wind.deg, speed: data.wind.speed },
         description: data.weather[0].description,
         id: data.weather[0].id,
      },
      timeData: {
         timezone: data.timezone / MIN_IN_HOUR / SEC_IN_MIN,
         sunrise: new Date(data.sys.sunrise * 1000),
         sunset: new Date(data.sys.sunset * 1000),
         currentDate: new Date(),
      },
   };
   // conver sunrise and sunset
   weatherObject.timeData.sunrise = convertDate(
      weatherObject.timeData.sunrise,
      weatherObject.timeData.timezone
   );

   weatherObject.timeData.sunset = convertDate(
      weatherObject.timeData.sunset,
      weatherObject.timeData.timezone
   );

   return weatherObject;
};

const convertToHourlyObject = (data) => {
   const hourly = data.slice(1, NUM_HOURS).map((hour) => {
      return {
         currentTime: new Date(hour.dt * 1000),
         temp: Math.round(hour.temp),
         id: hour.weather[0].id,
      };
   });

   return hourly;
};

const convertToDailyObject = (data) => {
   const daily = data.slice(1, NUM_DAYS).map((day) => {
      return {
         currentDate: new Date(day.dt * 1000),
         temp: {
            main: Math.round(day.temp.day),
            max: Math.round(day.temp.max),
            min: Math.round(day.temp.min),
         },
         id: day.weather[0].id,
      };
   });

   return daily;
};

const getWeatherData = async (response) => {
   try {
      const data = await response.json();
      if (!response.ok) throw new Error(`${data.message}`);
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

      const weatherData = await getWeatherData(response);

      return weatherData;
   } catch (error) {
      throw error;
   }
};

export const getCurrentWeatherFromCoords = async ({ lat, lon, units }) => {
   try {
      const response = await fetch(
         `${API_URL}weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
      );
      const weatherData = await getWeatherData(response);

      return weatherData;
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
      if (!response.ok) throw new Error(`${data.message}`);

      const hourly = convertToHourlyObject(data.hourly);
      const daily = convertToDailyObject(data.daily);

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

   // undisable sync button
   syncBtn.classList.remove("btn--disabled");
};

export const getCurrentPosition = () => {
   return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
   });
};
