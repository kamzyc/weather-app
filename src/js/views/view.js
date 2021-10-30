import {
   NUM_HOURS,
   DATE_OPTIONS,
   ICONS,
   CLASSNAMES,
   BASE_ICON_ROTATION,
} from "../config";
import { convertDate, checkIcon, checkDayTime } from "../utilities";
import DOMCreator from "../DOMCreator";
import { createMainWeatherElement } from "./mainWeatherView";
import { createHourlyElement } from "./hourlyView";
import { createDailyElement } from "./dailyView";
import { createWindElement } from "./windElement";

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

export const createWeatherIconElement = (
   id,
   sunrise,
   sunset,
   className = CLASSNAMES.CURRENT_WEATHER
) => {
   const parent = DOMCreator.createElement("div", `${className}__icon`);
   const icon = DOMCreator.createElement("img");

   const dayTime = checkDayTime(sunrise, sunset);
   const iconType = checkIcon(id, dayTime);

   DOMCreator.addAttribute(icon, "src", ICONS[`${iconType}`]);

   DOMCreator.appendElements(icon, parent);
   return parent;
};

export const createMaxMinElement = (
   { min, max },
   className = CLASSNAMES.CURRENT_WEATHER
) => {
   const parent = DOMCreator.createElement("div", `${className}__min-max`);
   const maxElemement = DOMCreator.createElement("span", "max", `${max}°`);
   const minElement = DOMCreator.createElement("span", "min", ` / ${min}°`);

   DOMCreator.appendElements([maxElemement, minElement], parent);
   return parent;
};

export const createIconElement = (className, iconName) => {
   const parent = DOMCreator.createElement("div", `${className}__icon`);

   const icon = DOMCreator.createElement("img");
   DOMCreator.addAttribute(icon, "src", iconName);

   DOMCreator.appendElements(icon, parent);
   return parent;
};

//////////////////////////////////////////////////////////////////////////////////////////
export const updateView = (location, timeData, weather, hourly, daily) => {
   // create elements
   const mainWeatherElement = createMainWeatherElement(
      location,
      timeData,
      weather
   );
   const hourlyElement = createHourlyElement(hourly, timeData);
   const dailyElement = createDailyElement(daily, timeData);
   const windElement = createWindElement(weather, location);

   console.log(weather);

   // clear containers
   DOMCreator.clearElement(mainWeatherContainer);
   DOMCreator.clearElement(hourlyContainer);
   DOMCreator.clearElement(dailyContainer);
   DOMCreator.clearElement(windContainer);

   // add elements to containers
   DOMCreator.appendElements(mainWeatherElement, mainWeatherContainer);
   DOMCreator.appendElements(hourlyElement, hourlyContainer);
   DOMCreator.appendElements(dailyElement, dailyContainer);
   DOMCreator.appendElements(windElement, windContainer);
};
