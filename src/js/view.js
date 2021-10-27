import { NUM_HOURS, DATE_OPTIONS, ICONS, CLASSNAMES } from "./config";
import { convertDate, checkIcon, checkDayTime } from "./utilities";
import DOMCreator from "./DOMCreator";

// DOM elements
export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");
export const syncBtn = document.querySelector(".navbar__sync");
export const geoBtn = document.querySelector(".navbar__geo");
export const pinBtn = document.querySelector(".navbar__pin");

const mainWeatherContainer = document.querySelector(".current-weather");
const hourlyContainer = document.querySelector(".hourly");

// //^ MAIN ELEMENT
// const createTitleElem = (name) => {
//    // return createElem("h2", "current-weather__location", name);
//    return DOMCreator.createElement("h2", "current-weather__location", name);
// };

// const createDateElem = () => {
//    const date = convertDate(new Date(), DATE_OPTIONS.LONG);
//    // return createElem("div", "current-weather__date", date);
//    return DOMCreator.createElement("div", "current-weather__date", date);
// };

// const createIconElem = (className, id, sunrise, sunset) => {
//    const parent = DOMCreator.createElement("div", className);
//    const icon = DOMCreator.createElement("img");

//    const dayTime = checkDayTime(sunrise, sunset);
//    const iconType = checkIcon(id, dayTime);

//    // addAttribute(icon, "src", ICONS[`${iconType}`]);
//    DOMCreator.addAttribute(icon, "src", ICONS[`${iconType}`]);

//    // addElem(icon, parent);
//    DOMCreator.appendElements(icon, parent);
//    return parent;
// };

// const createMaxMinElem = (max, min) => {
//    const parent = DOMCreator.createElement(
//       "div",
//       "current-weather__min-max",
//       ""
//    );
//    const tempMaxElem = DOMCreator.createElement("span", "max", `${max}°`);
//    const tempMinElem = DOMCreator.createElement("span", "min", ` / ${min}°`);
//    DOMCreator.appendElements([tempMaxElem, tempMinElem], parent);
//    return parent;
// };

// const createWeatherElem = (temp, description, id, sunrise, sunset) => {
//    const tempElem = DOMCreator.createElement(
//       "div",
//       "current-weather__temp",
//       `${temp.main}°`
//    );
//    const descriptionElem = DOMCreator.createElement(
//       "div",
//       "current-weather__description",
//       description
//    );
//    const iconElem = createIconElem(
//       "current-weather__icon",
//       id,
//       sunrise,
//       sunset
//    );
//    const maxMinSection = createMaxMinElem(temp.max, temp.min);

//    const parent = DOMCreator.createElement(
//       "section",
//       "current-weather__content"
//    );

//    DOMCreator.appendElements(
//       [tempElem, iconElem, descriptionElem, maxMinSection],
//       parent
//    );
//    return parent;
// };

// const createMainElem = (
//    { name },
//    { temp, description, id, sunrise, sunset }
// ) => {
//    const titleElem = createTitleElem(name);
//    const dateElem = createDateElem();
//    const weatherDataElem = createWeatherElem(
//       temp,
//       description,
//       id,
//       sunrise,
//       sunset
//    );

//    return [titleElem, dateElem, weatherDataElem];
// };

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

// export const updateView = (location, currentWeather, hourly) => {
//    console.log("Updating view...");

//    const sunrise = currentWeather.sunrise;
//    const sunset = currentWeather.sunset;

//    // create views
//    const mainElem = createMainElem(location, currentWeather);
//    const hourlyElem = createHourlyElem(hourly.slice(1, NUM_HOURS));

//    // clear containers
//    DOMCreator.clearElement(weatherContainer);
//    DOMCreator.clearElement(hourlyContainer);

//    // append elements
//    DOMCreator.appendElements(mainElem, weatherContainer);
//    DOMCreator.appendElements(hourlyElem, hourlyContainer);
// };

// new version

//////////////////////////////////////////////////////////////////////////////////////////
//? Main weather element
const createIconElem = (
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
   const iconElement = createIconElem(id, sunrise, sunset);

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

const createMainWeatherElement = ({ name, lat, lon }, timeData, weather) => {
   const parent = DOMCreator.createElement("main", CLASSNAMES.CURRENT_WEATHER);

   // title
   const locationElement = DOMCreator.createElement(
      "h2",
      `${CLASSNAMES.CURRENT_WEATHER}__location`,
      `${name} ${lat.toFixed()} ${lon.toFixed()}` //! to update
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
const createHourlyElement = () => {};
//////////////////////////////////////////////////////////////////////////////////////////

export const updateView = (location, timeData, weather) => {
   console.log("Updating view...");
   console.log(weather);

   // create elements
   const mainWeatherElement = createMainWeatherElement(
      location,
      timeData,
      weather
   );

   const hourlyElement = createHourlyElement();
   // clear containers
   DOMCreator.clearElement(mainWeatherContainer);

   // add elements to containers
   DOMCreator.appendElements(mainWeatherElement, mainWeatherContainer);
};
