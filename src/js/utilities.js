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

export const searchInObject = (value1, value2, object) => {
   for (const [key] of Object.entries(object)) {
      if (key.includes(value1) && key.includes(value2)) {
         return key;
      }
   }
};

export const checkDayTime = (currentDate, sunrise, sunset) => {
   if (
      currentDate.getHours() > sunrise.getHours() &&
      currentDate.getHours() < sunset.getHours()
   )
      return "d";
   return "n";
};
