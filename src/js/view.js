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
const dailyContainer = document.querySelector(`.${CLASSNAMES.DAILY}`);

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
   const iconElement = createIconElement(id, sunrise, sunset);

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
   const parent = DOMCreator.createElement("ul", `${CLASSNAMES.HOURLY}__list`);
   const hoursElement = hourly.map((hour) => {
      return createHourElement(hour, timeData);
   });

   DOMCreator.appendElements(hoursElement, parent);
   return parent;
};

const createGraphElement = () => {
   const parent = DOMCreator.createElement("div", "graph");
   const labels = ["January", "February", "March", "April", "May", "June"];
   const data = {
      labels: labels,
      datasets: [
         {
            label: "My First dataset",
            backgroundColor: "white",
            borderColor: "white",
            data: [0, 10, 5, 2, 20, 30, 45],
         },
      ],
   };

   const config = {
      type: "line",
      data: data,
      options: {},
   };

   const canvas = DOMCreator.createElement("canvas");

   const myChart = new Chart(canvas, config);

   DOMCreator.appendElements(canvas, parent);

   return parent;
};

const tmp = (hourly, timeData) => {
   const parent = DOMCreator.createElement("div");
   const a = createHoursElement(hourly, timeData);
   const g = createGraphElement();

   DOMCreator.appendElements([a, g], parent);
   return parent;
};

const createHourlyElement = (hourly, timeData) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.HOURLY}__panel`
   );

   // hour elements
   // const hoursElement = createHoursElement(hourly, timeData);
   const hoursElement = tmp(hourly, timeData);

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
   const iconElement = createIconElement(id, sunrise, sunset, CLASSNAMES.DAILY);

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

   console.log(daily);

   // day elements
   const daysElement = createDaysElement(daily, timeData);

   DOMCreator.appendElements(daysElement, parent);
   return parent;
};
//////////////////////////////////////////////////////////////////////////////////////////
export const updateView = (location, timeData, weather, hourly, daily) => {
   console.log("Updating view...");

   // create elements
   const mainWeatherElement = createMainWeatherElement(
      location,
      timeData,
      weather
   );

   const hourlyElement = createHourlyElement(hourly, timeData);
   const dailyElement = createDailyElement(daily, timeData);

   // clear containers
   DOMCreator.clearElement(mainWeatherContainer);
   DOMCreator.clearElement(hourlyContainer);
   DOMCreator.clearElement(dailyContainer);

   // add elements to containers
   DOMCreator.appendElements(mainWeatherElement, mainWeatherContainer);
   DOMCreator.appendElements(hourlyElement, hourlyContainer);
   DOMCreator.appendElements(dailyElement, dailyContainer);
};
