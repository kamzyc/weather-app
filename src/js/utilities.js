import { ICONS } from "./config";

export const setFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "q";
};

export const convertDateFormat = (date, options) => {
   return date.toLocaleString("en-US", options);
};

export const convertDate = (date, timezone) => {
   date.setHours(date.getUTCHours() + timezone);
   return date;
};

export const checkIcon = (id, dayTime) => {
   let iconName;
   for (const [key] of Object.entries(ICONS)) {
      if (key.includes(id) && key.includes(dayTime)) {
         iconName = key;
      }
   }
   return iconName;
};

export const checkDayTime = (currentDate, sunrise, sunset) => {
   if (currentDate > sunrise && currentDate < sunset) return "d";
   return "n";
};
