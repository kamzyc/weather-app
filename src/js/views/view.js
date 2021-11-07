import { ICONS, CLASSNAMES, BG } from "../config";
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
export const unitsSwitcher = document.getElementById("units-checkbox");

const container = document.querySelector(".container");
const mainWeatherContainer = document.querySelector(
   `.${CLASSNAMES.CURRENT_WEATHER}`
);
const hourlyContainer = document.querySelector(`.${CLASSNAMES.HOURLY}`);
const dailyContainer = document.querySelector(`.${CLASSNAMES.DAILY}`);
const windContainer = document.querySelector(`.${CLASSNAMES.WIND}`);
const comfortLevelContainer = document.querySelector(
   `.${CLASSNAMES.COMFORT_LEVEL}`
);
const statusContainer = document.querySelector(`.${CLASSNAMES.STATUS}`);

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

export const createTextElement = (name, value) => {
   const nameElement = DOMCreator.createElement("span", "name", name);
   const valueElement = DOMCreator.createElement("span", "value", value);

   return DOMCreator.createParentElement("div", `${CLASSNAMES.PANEL}__text`, [
      nameElement,
      valueElement,
   ]);
};

//////////////////////////////////////////////////////////////////////////////////////////
// error
export const showError = (message) => {
   DOMCreator.clearElements(statusContainer);
   const errorElement = DOMCreator.createElement(
      "span",
      `${CLASSNAMES.STATUS}__error`,
      message
   );

   DOMCreator.appendElements(errorElement, statusContainer);
   if (statusContainer.classList.contains("hidden"))
      statusContainer.classList.remove("hidden");
};

export const clearStatus = () => {
   if (!statusContainer.classList.contains("hidden"))
      statusContainer.classList.add("hidden");
   DOMCreator.clearElements(statusContainer);
};

//////////////////////////////////////////////////////////////////////////////////////////
// spinner
export const showSpinner = () => {
   DOMCreator.clearElements(statusContainer);
   const spinnerIcon = createIconElement(
      ICONS.umbrella,
      `${CLASSNAMES.STATUS}`
   );
   DOMCreator.appendElements(spinnerIcon, statusContainer);
   if (statusContainer.classList.contains("hidden"))
      statusContainer.classList.remove("hidden");
};

//////////////////////////////////////////////////////////////////////////////////////////
// bg
const setBg = ({ id }, { currentDate, sunrise, sunset }) => {
   const dayTime = checkDayTime(currentDate, sunrise, sunset);
   let bgName;
   for (const [key] of Object.entries(BG)) {
      if (key.includes(id) && key.includes(dayTime)) {
         bgName = key;
      }
   }

   // remove all bg classes
   container.classList.forEach((className) => {
      if (className.includes("bg"))
         DOMCreator.removeClasses(container, className);
   });
   DOMCreator.addClasses(container, `bg-${BG[bgName]}`);
};

//////////////////////////////////////////////////////////////////////////////////////////
export const updateView = (location, timeData, weather, hourly, daily) => {
   clearStatus();
   DOMCreator.removeClasses(syncBtn, "btn--disabled");
   DOMCreator.removeClasses(unitsSwitcher, "btn--disabled");

   // create elements
   const mainWeatherElement = createMainWeatherElement(
      location,
      timeData,
      weather
   );

   const hourlyElement = createHourlyElement(hourly, timeData);
   const dailyElement = createDailyElement(daily, timeData);
   const windElement = createWindElement(weather, location);
   const comfortLevelElement = createComfortLevelElement(weather);

   DOMCreator.clearElements([
      mainWeatherContainer,
      hourlyContainer,
      dailyContainer,
      windContainer,
      comfortLevelContainer,
   ]);

   // update bg
   setBg(weather, timeData);

   // add elements to containers
   DOMCreator.appendElements(mainWeatherElement, mainWeatherContainer);
   DOMCreator.appendElements(hourlyElement, hourlyContainer);
   DOMCreator.appendElements(dailyElement, dailyContainer);
   DOMCreator.appendElements(windElement, windContainer);
   DOMCreator.appendElements(comfortLevelElement, comfortLevelContainer);
};
