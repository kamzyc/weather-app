import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate, convertDateFormat } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement } from "./view";

const createHourElement = (
   { currentTime, id, temp },
   { timezone, sunrise, sunset }
) => {
   // time
   const convertedTime = convertDate(currentTime, timezone);
   const timeElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__time`,
      convertDateFormat(convertedTime, DATE_OPTIONS.ONLY_TIME)
   );

   // icon
   const iconElement = createWeatherIconElement(
      id,
      convertedTime,
      sunrise,
      sunset,
      CLASSNAMES.HOURLY
   );

   // temp
   const tempElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__temp`,
      `${temp}°`
   );

   return DOMCreator.createParentElement("li", `${CLASSNAMES.HOURLY}__item`, [
      timeElement,
      iconElement,
      tempElement,
   ]);
};

const createHoursElement = (hourly, timeData) => {
   const hoursElement = hourly.map((hour) => {
      return createHourElement(hour, timeData);
   });

   return DOMCreator.createParentElement(
      "ul",
      `${CLASSNAMES.HOURLY}__list`,
      hoursElement
   );
};

export const createHourlyElement = (hourly, timeData) => {
   const hoursElement = createHoursElement(hourly, timeData);

   return DOMCreator.createParentElement(
      "div",
      `${CLASSNAMES.HOURLY}__panel`,
      hoursElement
   );
};
