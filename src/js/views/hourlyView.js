import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement } from "./view";

const createHourElement = (
   { time, id, temp },
   { timezone, sunrise, sunset }
) => {
   // time
   //! fix issue with time
   const timeElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__time`,
      convertDate(time, DATE_OPTIONS.ONLY_TIME, timezone)
   );

   // icon
   const iconElement = createWeatherIconElement(
      id,
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
