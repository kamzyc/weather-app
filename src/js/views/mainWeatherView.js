import { DATE_OPTIONS, CLASSNAMES } from "../config";
import { convertDate, convertDateFormat } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createWeatherIconElement, createMaxMinElement } from "./view";

const createContentElement = (
   { temp, id, description },
   { currentDate, sunrise, sunset }
) => {
   // temp
   const tempElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__temp`,
      `${temp.main}°`
   );

   // icon
   const iconElement = createWeatherIconElement(
      id,
      currentDate,
      sunrise,
      sunset,
      CLASSNAMES.CURRENT_WEATHER
   );

   // description
   const descriptionElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__description`,
      description
   );

   // min-max
   const maxMinElement = createMaxMinElement(temp);

   return DOMCreator.createParentElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__content`,
      [tempElement, iconElement, descriptionElement, maxMinElement]
   );
};

export const createMainWeatherElement = ({ name }, timeData, weather) => {
   // title
   const locationElement = DOMCreator.createElement(
      "h2",
      `${CLASSNAMES.CURRENT_WEATHER}__location`,
      `${name}`
   );

   // time and date
   const convertedDate = convertDate(timeData.currentDate, timeData.timezone);
   const dateElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__date`,
      convertDateFormat(convertedDate, DATE_OPTIONS.LONG)
   );

   // content
   const contentElement = createContentElement(weather, timeData);

   return DOMCreator.createParentElement(
      "main",
      `${CLASSNAMES.CURRENT_WEATHER}__panel`,
      [locationElement, dateElement, contentElement]
   );
};
