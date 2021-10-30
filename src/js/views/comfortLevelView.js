import { CLASSNAMES } from "../config";
import { createTextElement } from "./view";
import DOMCreator from "../DOMCreator";

const createChart = (humidity) => {
   const ctx = DOMCreator.createElement("canvas");
   DOMCreator.addAttribute(ctx, "id", "humidity-chart");

   const labels = ["Humidity"];
   const data = {
      labels: labels,
      datasets: [
         {
            label: "My First dataset",
            backgroundColor: "rgb(255, 99, 132)",
            borderColor: "rgb(255, 99, 132)",
            data: [humidity],
         },
      ],
   };

   const config = {
      type: "doughnut",
      data: data,
      options: {},
   };

   const myChart = new Chart(document.getElementById("humidity-chart"), config);
   return ctx;
};

const createHumidityElement = (humidity) => {
   const parent = DOMCreator.createElement(
      "div",
      `${CLASSNAMES.COMFORT_LEVEL}__chart`
   );

   const chart = createChart(humidity);

   DOMCreator.appendElements([chart], parent);
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

const createComfortLevelDescriptionElement = ({ pressure, temp }) => {
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
   // const pressureElement = createTextElement(
   //    "pressure",
   //    `${pressure} hPa`,
   //    CLASSNAMES.COMFORT_LEVEL
   // );
   const pressureAndFeelsLikeElement =
      createComfortLevelDescriptionElement(weather);

   DOMCreator.appendElements(
      [titleElement, humidityElement, pressureAndFeelsLikeElement],
      parent
   );
   return parent;
};
