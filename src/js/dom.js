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

/*
 <h2 class="current-weather__location">Current location</h2>
         <div class="current-weather__date">Thu, 5 Decenver 10:51 am</div>

         <section class="current-weather__content">
            <div class="current-weather__temp">14&deg;</div>
            <div class="current-weather__icon">X</div>
            <div class="current-weather__description">Clear sky</div>
            <div class="current-weather__min-max">
               <span class="max">22</span>
               /
               <span class="min">6</span>
            </div>
         </section>



         weather: {
            temp: {
               main: data.main.temp,
               tempMax: data.main.temp_max,
               tempMin: data.main.temp_min,
            },
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: { angle: data.wind.deg, speed: data.wind.speed },
            description: data.weather[0].description,
            main: data.weather[0].main,
         },
      
*/
