import { CLASSNAMES } from "../config";
import DOMCreator from "../DOMCreator";

export const createMapElement = (location) => {
   return DOMCreator.createParentElement("div", `${CLASSNAMES.MAP}__panel`);
};
