import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement, createMaxMinElement } from "./view";

const createContentElement = (
   { temp, id, description },
   { sunrise, sunset }
) => {
   const parent = DOMCreator.createElement(
      "section",
      `${CLASSNAMES.CURRENT_WEATHER}__content`
   );

   // temp
   const tempElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__temp`,
      `${temp.main}°`
   );

   // icon
   const iconElement = createWeatherIconElement(id, sunrise, sunset);

   // description
   const descriptionElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__description`,
      description
   );

   // min-max
   const maxMinElement = createMaxMinElement(temp);

   // add to parent
   DOMCreator.appendElements(
      [tempElement, iconElement, descriptionElement, maxMinElement],
      parent
   );
   return parent;
};

export const createMainWeatherElement = ({ name }, timeData, weather) => {
   const parent = DOMCreator.createElement(
      "main",
      `${CLASSNAMES.CURRENT_WEATHER}__panel`
   );

   // title
   const locationElement = DOMCreator.createElement(
      "h2",
      `${CLASSNAMES.CURRENT_WEATHER}__location`,
      `${name}`
   );

   // time and date
   const currentDate = convertDate(
      new Date(),
      DATE_OPTIONS.LONG,
      timeData.timezone
   );
   const dateElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__date`,
      currentDate
   );

   // content
   const contentElement = createContentElement(weather, timeData);

   // add to parent
   DOMCreator.appendElements(
      [locationElement, dateElement, contentElement],
      parent
   );
   return parent;
};
