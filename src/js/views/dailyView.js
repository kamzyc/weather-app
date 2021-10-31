import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate, convertDateFormat } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement, createMaxMinElement } from "./view";

const createDayElement = (
   { currentDate, temp, id },
   { timezone, sunrise, sunset }
) => {
   // date
   const convertedDate = convertDate(currentDate, timezone);

   const dateElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.DAILY}__time`,
      convertDateFormat(convertedDate, DATE_OPTIONS.SHORT)
   );

   // icon
   const iconElement = createWeatherIconElement(
      id,
      convertedDate,
      sunrise,
      sunset,
      CLASSNAMES.DAILY
   );

   //temp (max / min)
   const maxMinElement = createMaxMinElement(temp, CLASSNAMES.DAILY);

   return DOMCreator.createParentElement("li", `${CLASSNAMES.DAILY}__item`, [
      dateElement,
      iconElement,
      maxMinElement,
   ]);
};

const createDaysElement = (daily, timeData) => {
   const daysElement = daily.map((day) => {
      return createDayElement(day, timeData);
   });

   return DOMCreator.createParentElement(
      "ul",
      `${CLASSNAMES.DAILY}__list`,
      daysElement
   );
};

export const createDailyElement = (daily, timeData) => {
   const daysElement = createDaysElement(daily, timeData);

   return DOMCreator.createParentElement(
      "div",
      `${CLASSNAMES.DAILY}__panel`,
      daysElement
   );
};
