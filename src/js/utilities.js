import { DATE_OPTIONS } from "./config";

export const setFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "q";
};

export const convertDate = (date, options) => {
   return date.toLocaleString("en-US", options);
};

const isArray = (value) => Array.isArray(value);

export const addClasses = (element, classes) => {
   if (isArray(classes))
      classes.forEach((className) => element.classList.add(className));
   else element.classList.add(classes);
};

export const addContent = (element, content) => {
   element.innerText = content;
};

export const clearElem = (element) => {
   element.querySelectorAll("*").forEach((children) => children.remove());
};

export const addElem = (elements, parent) => {
   if (isArray(elements)) elements.forEach((element) => parent.append(element));
   else parent.append(elements);
};

export const createElem = (tag, classes, content) => {
   const element = document.createElement(tag);
   addClasses(element, classes);
   addContent(element, content);

   return element;
};
