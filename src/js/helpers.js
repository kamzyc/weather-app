export const checkFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "name";
};
