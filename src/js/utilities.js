import { ICONS } from "./config";

export const setFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "q";
};

export const convertDate = (date, options, timezone) => {
   date.setHours(date.getUTCHours() + timezone);
   return date.toLocaleString("en-US", options);
};

export const isArray = (value) => Array.isArray(value);

export const checkIcon = (id, dayTime) => {
   let iconName;
   for (const [key] of Object.entries(ICONS)) {
      if (key.includes(id) && key.includes(dayTime)) {
         iconName = key;
      }
   }

   return iconName;
};

export const checkDayTime = (sunrise, sunset) => {
   const currentTime = new Date().getTime();
   if (currentTime < sunrise.getTime()) return "n";
   if (currentTime > sunrise.getTime() && currentTime < sunset.getTime())
      return "d";
   return "n";
};
