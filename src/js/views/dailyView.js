import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement, createMaxMinElement } from "./view";

const createDayElement = (
   { time, temp, id },
   { timezone, sunrise, sunset }
) => {
   const parent = DOMCreator.createElement("li", `${CLASSNAMES.DAILY}__item`);

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

   DOMCreator.appendElements([dateElement, iconElement, maxMinElement], parent);
   return parent;
};

const createDaysElement = (daily, timeData) => {
   const parent = DOMCreator.createElement("ul", `${CLASSNAMES.DAILY}__list`);
   const daysElement = daily.map((day) => {
      return createDayElement(day, timeData);
   });

   DOMCreator.appendElements(daysElement, parent);
   return parent;
};

export const createDailyElement = (daily, timeData) => {
   const parent = DOMCreator.createElement("div", `${CLASSNAMES.DAILY}__panel`);

   // day elements
   const daysElement = createDaysElement(daily, timeData);

   DOMCreator.appendElements(daysElement, parent);
   return parent;
};
