"use strict";

// DOM elements
export const searchForm = document.querySelector(".search");
export const searchInput = document.querySelector(".search__input");
const titleContainer = document.querySelector(".current-weather__title");
const weatherContainer = document.querySelector(".current-weather__content");

const clearElem = (element) => {
   element.querySelectorAll("*").forEach((children) => children.remove());
};

const createElem = (tag, className, content) => {
   const element = document.createElement(tag);
   element.classList.add(className);
   element.innerText = content;
   return element;
};

const appendElem = (element, parent) => {
   parent.append(element);
};

const createWeatherTitle = (title) => {
   const titleElem = createElem("h2", "current-weather__location", title);

   const date = new Date().toISOString();
   const dateElem = createElem("div", "current-weather__date", date);

   clearElem(titleContainer);
   appendElem(titleElem, titleContainer);
   appendElem(dateElem, titleContainer);
};

export const updateView = (location, weather) => {
   console.log("Updating view...");

   // title
   createWeatherTitle(location.name);
};

/*
<h2 class="current-weather__title">Current location</h2>
<div class="current-weather__date">Thu, 5 Decenver 10:51 am</div>
*/
