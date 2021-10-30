import { ICONS, CLASSNAMES, BASE_ICON_ROTATION } from "../config";
import DOMCreator from "../DOMCreator";
import { createIconElement } from "./view";

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
   const parent = DOMCreator.createElement("div", `${CLASSNAMES.WIND}__text`);
   const nameElement = DOMCreator.createElement("span", "name", name);

   let unitsValue = "°";
   if (units) unitsValue = units === "metric" ? " m/s" : " mph";

   const valueElement = DOMCreator.createElement(
      "span",
      "value",
      `${Math.round(value)}${unitsValue}`
   );

   DOMCreator.appendElements([nameElement, valueElement], parent);
   return parent;
};

const createWindDescriptionElement = ({ angle, speed }, units) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.WIND}__description`
   );

   const angleElement = createWindTextElement("angle", angle);
   const speedElement = createWindTextElement("speed", speed, units);

   DOMCreator.appendElements([angleElement, speedElement], parent);
   return parent;
};

export const createWindElement = ({ wind }, { units }) => {
   const parent = DOMCreator.createElement("div", `${CLASSNAMES.WIND}__panel`);

   // title
   const titleElement = DOMCreator.createElement(
      "h3",
      `${CLASSNAMES.WIND}__title`,
      "Wind"
   );

   // icon
   const iconElement = createIconElement(CLASSNAMES.WIND, ICONS.wind);

   // arrow
   const arrowElement = createArrowElement(wind.angle);

   // description
   const descriptionElement = createWindDescriptionElement(wind, units);

   DOMCreator.appendElements(
      [titleElement, iconElement, arrowElement, descriptionElement],
      parent
   );
   return parent;
};
