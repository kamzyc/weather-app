import { ICONS, CLASSNAMES } from "../config";
import { checkIcon, checkDayTime } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createMainWeatherElement } from "./mainWeatherView";
import { createHourlyElement } from "./hourlyView";
import { createDailyElement } from "./dailyView";
import { createWindElement } from "./windView";
import { createComfortLevelElement } from "./comfortLevelView";

// DOM elements
export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");
export const syncBtn = document.querySelector(".navbar__sync");
export const geoBtn = document.querySelector(".navbar__geo");
export const pinBtn = document.querySelector(".navbar__pin");

const mainWeatherContainer = document.querySelector(
   `.${CLASSNAMES.CURRENT_WEATHER}`
);
const hourlyContainer = document.querySelector(`.${CLASSNAMES.HOURLY}`);
const dailyContainer = document.querySelector(`.${CLASSNAMES.DAILY}`);
const windContainer = document.querySelector(`.${CLASSNAMES.WIND}`);
const comfortLevelContainer = document.querySelector(
   `.${CLASSNAMES.COMFORT_LEVEL}`
);

export const createMaxMinElement = (
   { min, max },
   className = CLASSNAMES.CURRENT_WEATHER
) => {
   const maxElemement = DOMCreator.createElement("span", "max", `${max}°`);
   const minElement = DOMCreator.createElement("span", "min", ` / ${min}°`);

   return DOMCreator.createParentElement("div", `${className}__min-max`, [
      maxElemement,
      minElement,
   ]);
};

export const createIconElement = (iconName, className) => {
   const icon = DOMCreator.createElement("img");
   DOMCreator.addAttribute(icon, "src", iconName);

   return DOMCreator.createParentElement("div", `${className}__icon`, icon);
};

export const createWeatherIconElement = (
   id,
   currentDate,
   sunrise,
   sunset,
   className
) => {
   const dayTime = checkDayTime(currentDate, sunrise, sunset);
   const iconType = checkIcon(id, dayTime);

   return createIconElement(ICONS[`${iconType}`], className);
};

export const createTextElement = (name, value, className) => {
   const nameElement = DOMCreator.createElement("span", "name", name);
   const valueElement = DOMCreator.createElement("span", "value", value);

   return DOMCreator.createParentElement("div", `${className}__text`, [
      nameElement,
      valueElement,
   ]);
};

//////////////////////////////////////////////////////////////////////////////////////////
export const updateView = (location, timeData, weather, hourly, daily) => {
   // create elements
   const mainWeatherElement = createMainWeatherElement(
      location,
      timeData,
      weather
   );
   // console.log(hourly);

   const hourlyElement = createHourlyElement(hourly, timeData);
   // const dailyElement = createDailyElement(daily, timeData);
   // const windElement = createWindElement(weather, location);
   // const comfortLevelElement = createComfortLevelElement(weather);

   // clear containers
   DOMCreator.clearElement(mainWeatherContainer);
   DOMCreator.clearElement(hourlyContainer);
   // DOMCreator.clearElement(dailyContainer);
   // DOMCreator.clearElement(windContainer);
   // DOMCreator.clearElement(comfortLevelContainer);

   // add elements to containers
   DOMCreator.appendElements(mainWeatherElement, mainWeatherContainer);
   DOMCreator.appendElements(hourlyElement, hourlyContainer);
   // DOMCreator.appendElements(dailyElement, dailyContainer);
   // DOMCreator.appendElements(windElement, windContainer);
   // DOMCreator.appendElements(comfortLevelElement, comfortLevelContainer);
};
