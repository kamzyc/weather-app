import { CLASSNAMES } from "../config";
import { createTextElement } from "./view";
import DOMCreator from "../DOMCreator";

const createChart = (humidity) => {
   const canvasElement = DOMCreator.createElement("canvas");

   const data = {
      datasets: [
         {
            data: [humidity, 100 - humidity],
            backgroundColor: ["rgb(242, 243, 243)", "rgba(242, 243, 243, 0.1)"],
            borderColor: ["rgb(242, 243, 243)", "rgba(242, 243, 243, 0.1)"],
            borderWidth: 0,
            borderRadius: [10, 0],
            spacing: -5,
         },
      ],
   };

   const config = {
      type: "doughnut",
      data: data,
      options: {
         cutout: "88%",
         events: [],
      },
   };

   const myChart = new Chart(canvasElement, config);
   return canvasElement;
};

const createHumidityElement = ({ humidity }) => {
   const chart = createChart(humidity);

   const humidityTextElement = createTextElement("humidity", `${humidity}%`);

   return DOMCreator.createParentElement(
      "div",
      `${CLASSNAMES.COMFORT_LEVEL}__humidity`,
      [chart, humidityTextElement]
   );
};

const createComfortLevelTextElement = (name, value, units = null) => {
   let unitsValue = "°";
   if (units) unitsValue = units;
   return createTextElement(name, `${value}${unitsValue}`);
};

const createComfortLevelDescriptionElement = ({ pressure, temp }) => {
   const feelsLikeElement = createComfortLevelTextElement(
      "feels like",
      temp.feelsLike
   );
   const pressureElement = createComfortLevelTextElement(
      "pressure",
      pressure,
      " hPa"
   );

   return DOMCreator.createParentElement(
      "div",
      `${CLASSNAMES.PANEL}__description`,
      [feelsLikeElement, pressureElement]
   );
};

export const createComfortLevelElement = (weather) => {
   // title
   const titleElement = DOMCreator.createElement(
      "h3",
      `${CLASSNAMES.PANEL}__title`,
      "Comfort level"
   );

   // humidity
   const humidityElement = createHumidityElement(weather);

   // pressure and feels like
   const descriptionElement = createComfortLevelDescriptionElement(weather);

   return DOMCreator.createParentElement(
      "div",
      [`${CLASSNAMES.COMFORT_LEVEL}__panel`, `${CLASSNAMES.PANEL}`],
      [titleElement, humidityElement, descriptionElement]
   );
};
