import { CLASSNAMES, BASE_ICON_ROTATION } from "../config";
import DOMCreator from "../DOMCreator";
import { createTextElement } from "./view";

const createArrowElement = (angle) => {
   const arrow = DOMCreator.createElement("i", [
      "fas",
      "fa-location-arrow",
      `${CLASSNAMES.WIND}__arrow`,
   ]);

   DOMCreator.addStyles(arrow, {
      transform: `rotate(${BASE_ICON_ROTATION}deg) rotate(${angle}deg)`,
   });

   return arrow;
};

const createWindTextElement = (name, value, units = null) => {
   let unitsValue = "°";
   if (units) unitsValue = units === "metric" ? " m/s" : " mph";

   return createTextElement(name, `${Math.round(value)}${unitsValue}`);
};

const createWindDescriptionElement = ({ angle, speed }, units) => {
   const angleElement = createWindTextElement("angle", angle);
   const speedElement = createWindTextElement("speed", speed, units);

   return DOMCreator.createParentElement(
      "div",
      `${CLASSNAMES.PANEL}__description`,
      [angleElement, speedElement]
   );
};

export const createWindElement = ({ wind }, { units }) => {
   // title
   const titleElement = DOMCreator.createElement(
      "h3",
      `${CLASSNAMES.PANEL}__title`,
      "Wind"
   );

   // arrow
   const arrowElement = createArrowElement(wind.angle);

   // description
   const descriptionElement = createWindDescriptionElement(wind, units);

   return DOMCreator.createParentElement(
      "div",
      [`${CLASSNAMES.WIND}__panel`, `${CLASSNAMES.PANEL}`],
      [titleElement, arrowElement, descriptionElement]
   );
};
