import { NUM_HOURS, DATE_OPTIONS } from "./config";
import {
   addClasses,
   addContent,
   clearElem,
   addElem,
   createElem,
   convertDate,
   addAttribute,
} from "./utilities";

// DOM elements
export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");
export const syncBtn = document.querySelector(".navbar__sync");
export const geoBtn = document.querySelector(".navbar__geo");
export const pinBtn = document.querySelector(".navbar__pin");

const weatherContainer = document.querySelector(".current-weather");
const hourlyContainer = document.querySelector(".hourly");

//^ MAIN ELEMENT
const createTitleElem = (name) => {
   return createElem("h2", "current-weather__location", name);
};

const createDateElem = () => {
   const date = convertDate(new Date(), DATE_OPTIONS.LONG);
   return createElem("div", "current-weather__date", date);
};

//! to change
const createIconElem = (id, className) => {
   const parent = createElem("div", className, "");
   const icon = createElem("img", "", "");
   // addAttribute(icon, "src", "../src/imgs/drizzle.svg");
   icon.src = "../imgs/drizzle.svf";
   addElem(icon, parent);
   // return createElem("div", "current-weather__icon", "X");
   return parent;
};

const createMaxMinElem = (max, min) => {
   const parent = createElem("div", "current-weather__min-max", "");
   const tempMaxElem = createElem("span", "max", `${max}°`);
   const tempMinElem = createElem("span", "min", ` / ${min}°`);
   addElem([tempMaxElem, tempMinElem], parent);
   return parent;
};

const createWeatherElem = (temp, description, id) => {
   const tempElem = createElem("div", "current-weather__temp", `${temp.main}°`);
   const descriptionElem = createElem(
      "div",
      "current-weather__description",
      description
   );
   const iconElem = createIconElem(id, "current-weather__icon");
   const maxMinSection = createMaxMinElem(temp.max, temp.min);

   const parent = createElem("section", "current-weather__content", "");

   addElem([tempElem, iconElem, descriptionElem, maxMinSection], parent);
   return parent;
};

const createMainElem = ({ name }, { temp, description, id }) => {
   const titleElem = createTitleElem(name);
   const dateElem = createDateElem();
   const weatherDataElem = createWeatherElem(temp, description, id);

   return [titleElem, dateElem, weatherDataElem];
};

//^ hOURLY ELEMENT
const createHourElem = ({ time, id, temp }) => {
   const timeElem = createElem(
      "div",
      "hourly__time",
      convertDate(time, DATE_OPTIONS.ONLY_TIME)
   );
   const iconElem = createElem("div", "hourly__icon", "X");
   const tempElem = createElem("div", "hourly__temp", temp);

   const hourElem = createElem("li", "hourly__item", "");
   addElem([timeElem, iconElem, tempElem], hourElem);
   return hourElem;
};

const createHoursElem = (hourly) => {
   const hoursElem = hourly.map(createHourElem);
   return hoursElem;
};

const createHourlyElem = (hourly) => {
   const listElem = createElem("ul", "hourly__list", "");
   const hoursElem = createHoursElem(hourly);

   addElem(hoursElem, listElem);

   return listElem;
};

export const updateView = (location, currentWeather, hourly) => {
   console.log("Updating view...");

   // create views
   const mainElem = createMainElem(location, currentWeather);
   const hourlyElem = createHourlyElem(hourly.slice(1, NUM_HOURS));

   // clear containers
   clearElem(weatherContainer);
   clearElem(hourlyContainer);

   // append elements
   addElem(mainElem, weatherContainer);
   addElem(hourlyElem, hourlyContainer);
};
