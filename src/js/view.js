import {
   NUM_HOURS,
   DATE_OPTIONS,
   ICONS,
   CLASSNAMES,
   BASE_ICON_ROTATION,
} from "./config";
import { convertDate, checkIcon, checkDayTime } from "./utilities";
import DOMCreator from "./DOMCreator";

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

//////////////////////////////////////////////////////////////////////////////////////////
//? Main weather element
const createWeatherIconElement = (
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

const createMaxMinElement = (
   { min, max },
   className = CLASSNAMES.CURRENT_WEATHER
) => {
   const parent = DOMCreator.createElement("div", `${className}__min-max`);
   const maxElemement = DOMCreator.createElement("span", "max", `${max}°`);
   const minElement = DOMCreator.createElement("span", "min", ` / ${min}°`);

   DOMCreator.appendElements([maxElemement, minElement], parent);
   return parent;
};

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

const createMainWeatherElement = ({ name }, timeData, weather) => {
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
//////////////////////////////////////////////////////////////////////////////////////////

//? Hourly element
//////////////////////////////////////////////////////////////////////////////////////////
const createHourElement = (
   { time, id, temp },
   { timezone, sunrise, sunset }
) => {
   const parent = DOMCreator.createElement("li", `${CLASSNAMES.HOURLY}__item`);

   // time
   //! fix issue with time
   const timeElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__time`,
      convertDate(time, DATE_OPTIONS.ONLY_TIME, timezone)
   );

   // icon
   const iconElement = createWeatherIconElement(
      id,
      sunrise,
      sunset,
      CLASSNAMES.HOURLY
   );

   // temp
   const tempElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__temp`,
      `${temp}°`
   );

   DOMCreator.appendElements([timeElement, iconElement, tempElement], parent);
   return parent;
};

const createHoursElement = (hourly, timeData) => {
   const parent = DOMCreator.createElement("ul", `${CLASSNAMES.HOURLY}__list`);
   const hoursElement = hourly.map((hour) => {
      return createHourElement(hour, timeData);
   });

   DOMCreator.appendElements(hoursElement, parent);
   return parent;
};

const createHourlyElement = (hourly, timeData) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__panel`
   );

   // hour elements
   // const hoursElement = createHoursElement(hourly, timeData);
   const hoursElement = createHoursElement(hourly, timeData);

   DOMCreator.appendElements([hoursElement], parent);
   return parent;
};

//////////////////////////////////////////////////////////////////////////////////////////

//? Daily element
//////////////////////////////////////////////////////////////////////////////////////////

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

const createDailyElement = (daily, timeData) => {
   const parent = DOMCreator.createElement("div", `${CLASSNAMES.DAILY}__panel`);

   // day elements
   const daysElement = createDaysElement(daily, timeData);

   DOMCreator.appendElements(daysElement, parent);
   return parent;
};
//////////////////////////////////////////////////////////////////////////////////////////

//? Wind element
//////////////////////////////////////////////////////////////////////////////////////////
const createIconElement = (className, iconName) => {
   const parent = DOMCreator.createElement("div", `${className}__icon`);

   const icon = DOMCreator.createElement("img");
   DOMCreator.addAttribute(icon, "src", iconName);

   DOMCreator.appendElements(icon, parent);
   return parent;
};

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

const createWindElement = ({ wind }, { units }) => {
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
