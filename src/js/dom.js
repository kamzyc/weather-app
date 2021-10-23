import {
   addClasses,
   addContent,
   clearElem,
   addElem,
   createElem,
   convertDate,
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
   const date = convertDate(new Date(), true);
   return createElem("div", "current-weather__date", date);
};

//! to change
const createIconElem = (main) => {
   return createElem("div", "current-weather__icon", "X");
};

const createMaxMinElem = (max, min) => {
   const parent = createElem("div", "current-weather__min-max", "");
   const tempMaxElem = createElem("span", "max", `${max}`);
   const tempMinElem = createElem("span", "min", ` / ${min}`);
   addElem([tempMaxElem, tempMinElem], parent);
   return parent;
};

const createWeatherElem = (temp, description, main) => {
   const tempElem = createElem("div", "current-weather__temp", `${temp.main}°`);
   const descriptionElem = createElem(
      "div",
      "current-weather__description",
      description
   );
   const iconElem = createIconElem(main);
   const maxMinSection = createMaxMinElem(temp.max, temp.min);

   const section = createElem("section", "current-weather__content", "");

   addElem([tempElem, iconElem, descriptionElem, maxMinSection], section);
   return section;
};

const createMainElem = (name, temp, description, main) => {
   const titleElem = createTitleElem(name);
   const dateElem = createDateElem();
   const weatherDataElem = createWeatherElem(temp, description, main);

   return [titleElem, dateElem, weatherDataElem];
};

//^ hOURLY ELEMENT
const createHourElem = ({ time, temp, description, main }) => {
   const hourElem = createElem(
      "div",
      "",
      `${time} -- ${temp} -- ${description}`
   );

   return hourElem;
};

const createHourlyElem = (hours) => {
   const hourlyElem = hours.map((hour) => createHourElem(hour));

   return hourlyElem;
};

export const updateView = ({ name }, { temp, description }, hours) => {
   console.log("Updating view...");

   // main view
   const mainElem = createMainElem(name, temp, description);

   // clear containers
   clearElem(weatherContainer);

   // append elements
   addElem(mainElem, weatherContainer);
};
