import { NUM_HOURS, DATE_OPTIONS, ICONS, CLASSNAMES } from "./config";
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

// //^ hOURLY ELEMENT
// const createHourElem = ({ time, id, temp }) => {
//    const timeElem = DOMCreator.createElement(
//       "div",
//       "hourly__time",
//       convertDate(time, DATE_OPTIONS.ONLY_TIME)
//    );
//    const iconElem = DOMCreator.createElement("div", "hourly__icon", "X");

//    const tempElem = DOMCreator.createElement("div", "hourly__temp", temp);

//    const hourElem = DOMCreator.createElement("li", "hourly__item");
//    DOMCreator.appendElements([timeElem, iconElem, tempElem], hourElem);
//    return hourElem;
// };

// const createHoursElem = (hourly) => {
//    const hoursElem = hourly.map(createHourElem);
//    return hoursElem;
// };

// const createHourlyElem = (hourly) => {
//    const listElem = DOMCreator.createElement("ul", "hourly__list");
//    const hoursElem = createHoursElem(hourly);

//    DOMCreator.appendElements(hoursElem, listElem);

//    return listElem;
// };

//////////////////////////////////////////////////////////////////////////////////////////
//? Main weather element
const createIconElement = (
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

const createMinMaxElement = ({ min, max }) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__min-max`
   );
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
   const iconElement = createIconElement(id, sunrise, sunset);

   // description
   const descriptionElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.CURRENT_WEATHER}__description`,
      description
   );

   // min-max
   const minMaxElement = createMinMaxElement(temp);

   // add to parent
   DOMCreator.appendElements(
      [tempElement, iconElement, descriptionElement, minMaxElement],
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
   const timeElement = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__time`,
      convertDate(time, DATE_OPTIONS.ONLY_TIME, timezone)
   );

   // icon
   const iconElement = createIconElement(
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
   console.log(hourly);
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
   const hoursElement = createHoursElement(hourly, timeData);
   // graph

   DOMCreator.appendElements([hoursElement], parent);
   return parent;
};

//////////////////////////////////////////////////////////////////////////////////////////
export const updateView = (location, timeData, weather, hourly) => {
   console.log("Updating view...");

   // create elements
   const mainWeatherElement = createMainWeatherElement(
      location,
      timeData,
      weather
   );

   const hourlyElement = createHourlyElement(hourly, timeData);

   // clear containers
   DOMCreator.clearElement(mainWeatherContainer);
   DOMCreator.clearElement(hourlyContainer);

   // add elements to containers
   DOMCreator.appendElements(mainWeatherElement, mainWeatherContainer);
   DOMCreator.appendElements(hourlyElement, hourlyContainer);
};
