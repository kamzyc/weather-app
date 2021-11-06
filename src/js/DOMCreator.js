class DOMCreator {
   static createElement = (tag, classes = null, content = null) => {
      const element = document.createElement(tag);
      if (classes) this.addClasses(element, classes);
      if (content) this.addContent(element, content);
      return element;
   };

   static addClasses = (element, classes) => {
      if (Array.isArray(classes))
         classes.forEach((className) => element.classList.add(className));
      else element.classList.add(classes);
   };

   static removeClasses = (element, classes) => {
      if (Array.isArray(classes))
         classes.forEach(
            (className) =>
               element.classList.contains(className) &&
               element.classList.remove(className)
         );
      else element.classList.remove(classes);
   };

   static addContent = (element, content) => {
      element.innerText = content;
   };

   static addAttribute = (element, attrName, attrValue) => {
      element.setAttribute(attrName, attrValue);
   };

   static clearElements = (elements) => {
      if (Array.isArray(elements))
         elements.forEach((element) =>
            element
               .querySelectorAll("*")
               .forEach((children) => children.remove())
         );
      else
         elements
            .querySelectorAll("*")
            .forEach((children) => children.remove());
   };

   static appendElements = (elements, parent) => {
      if (Array.isArray(elements))
         elements.forEach((element) => parent.append(element));
      else parent.append(elements);
   };

   static addStyles = (element, style) => {
      for (const property in style) element.style[property] = style[property];
   };

   static createParentElement = (tag, classes, children) => {
      const parent = this.createElement(tag, classes);
      this.appendElements(children, parent);
      return parent;
   };
}

export default DOMCreator;
