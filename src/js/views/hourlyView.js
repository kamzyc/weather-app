import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement } from "./view";

const createHourElement = (
   { time, id, temp },
   { timezone, sunrise, sunset }
) => {
   const parent = DOMCreator.createElement("li", `${CLASSNAMES.HOURLY}__item`);

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

   DOMCreator.appendElements([timeElement, iconElement, tempElement], parent);
   return parent;
};

const createHoursElement = (hourly, timeData) => {
   const parent = DOMCreator.createElement("ul", `${CLASSNAMES.HOURLY}__list`);
   const hoursElement = hourly.map((hour) => {
      return createHourElement(hour, timeData);
   });

   DOMCreator.appendElements(hoursElement, parent);
   return parent;
};

export const createHourlyElement = (hourly, timeData) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__panel`
   );

   const hoursElement = createHoursElement(hourly, timeData);

   DOMCreator.appendElements([hoursElement], parent);
   return parent;
};
