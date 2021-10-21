// DOM elements
export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");
export const syncBtn = document.querySelector(".navbar__sync");
export const geoBtn = document.querySelector(".navbar__geo");
export const pinBtn = document.querySelector(".navbar__pin");
const weatherContainer = document.querySelector(".current-weather");

const clearElem = (element) => {
   element.querySelectorAll("*").forEach((children) => children.remove());
};

const createElem = (tag, classNames, content) => {
   const element = document.createElement(tag);
   if (Array.isArray(classNames))
      classNames.forEach((className) => element.classList.add(className));
   else element.classList.add(classNames);

   element.innerText = content;
   return element;
};

const appendElem = (elements, parent) => {
   if (Array.isArray(elements))
      elements.forEach((element) => parent.append(element));
   else parent.append(elements);
};

const createTitleElem = (name) => {
   return createElem("h2", "current-weather__location", name);
};

const createDateElem = () => {
   const date = new Date().toISOString();
   return createElem("div", "current-weather__date", date);
};

const createIconElem = (main) => {
   return createElem("div", "current-weather__icon", "X");
};

const createMaxMinElem = (max, min) => {
   const section = createElem("div", "current-weather__min-max", "");
   const tempMaxElem = createElem("span", "max", `${max}`);
   const tempMinElem = createElem("span", "min", ` / ${min}`);
   appendElem([tempMaxElem, tempMinElem], section);
   return section;
};

const createWeatherDataElem = (
   { tempMain, tempMax, tempMin },
   description,
   main
) => {
   const tempElem = createElem("div", "current-weather__temp", `${tempMain}°`);
   const descriptionElem = createElem(
      "div",
      "current-weather__description",
      description
   );
   const iconElem = createIconElem(main);
   const maxMinSection = createMaxMinElem(tempMax, tempMin);

   const section = createElem("section", "current-weather__content", "");

   appendElem([tempElem, iconElem, descriptionElem, maxMinSection], section);
   return section;
};

const createMainElem = (name, temp, description, main) => {
   const titleElem = createTitleElem(name);
   const dateElem = createDateElem();
   const weatherDataElem = createWeatherDataElem(temp, description, main);

   return [titleElem, dateElem, weatherDataElem];
};

export const updateView = ({ name }, { temp, description }) => {
   console.log("Updating view...");
   const mainElem = createMainElem(name, temp, description);
   clearElem(weatherContainer);
   appendElem(mainElem, weatherContainer);
};
