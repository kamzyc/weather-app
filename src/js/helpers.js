export const setFlag = (query) => {
   const regex = /^\d+$/g;
   return regex.test(query) ? "zip" : "q";
};
