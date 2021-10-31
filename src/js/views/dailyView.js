import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement, createMaxMinElement } from "./view";

const createDayElement = (
   { time, temp, id },
   { timezone, sunrise, sunset }
) => {
   // date
   const dateElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.DAILY}__time`,
      convertDate(time, DATE_OPTIONS.SHORT, timezone)
   );

   // icon
   const iconElement = createWeatherIconElement(
      id,
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
