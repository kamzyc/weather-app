import { ICONS } from "./config";

export const setFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "q";
};

export const convertDate = (date, options) => {
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
