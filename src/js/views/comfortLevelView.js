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
         },
      ],
   };

   const config = {
      type: "doughnut",
      data: data,
      options: {
         cutout: "85%",
         events: [],
      },
   };

   const myChart = new Chart(canvasElement, config);
   return canvasElement;
};

const createHumidityElement = ({ humidity }) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.COMFORT_LEVEL}__humidity`
   );

   const chart = createChart(humidity);

   const humidityTextElement = createTextElement(
      "humidity",
      `${humidity}%`,
      CLASSNAMES.COMFORT_LEVEL
   );

   DOMCreator.appendElements([chart, humidityTextElement], parent);
   return parent;
};

const createComfortLevelTextElement = (name, value, units = null) => {
   let unitsValue = "°";
   if (units) unitsValue = units;
   return createTextElement(
      name,
      `${value}${unitsValue}`,
      CLASSNAMES.COMFORT_LEVEL
   );
};

const createPressureAndFeelsLikeElement = ({ pressure, temp }) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.COMFORT_LEVEL}__description`
   );

   const feelsLikeElement = createComfortLevelTextElement(
      "feels like",
      temp.feelsLike
   );
   const pressureElement = createComfortLevelTextElement(
      "pressure",
      pressure,
      " hPa"
   );

   DOMCreator.appendElements([feelsLikeElement, pressureElement], parent);
   return parent;
};

export const createComfortLevelElement = (weather) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.COMFORT_LEVEL}__panel`
   );

   // title
   const titleElement = DOMCreator.createElement(
      "h3",
      `${CLASSNAMES.COMFORT_LEVEL}__title`,
      "Comfort level"
   );

   // humidity
   const humidityElement = createHumidityElement(weather);

   // pressure and feels like
   const pressureAndFeelsLikeElement =
      createPressureAndFeelsLikeElement(weather);

   DOMCreator.appendElements(
      [titleElement, humidityElement, pressureAndFeelsLikeElement],
      parent
   );
   return parent;
};
