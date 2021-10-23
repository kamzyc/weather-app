import dotenv from "dotenv";

dotenv.config();
export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL;

export const NUM_HOURS = 24; // max 48
export const NUM_DAYS = 8; // max 8

export const MONTHS = {
   0: "January",
   1: "February",
   2: "March",
   3: "April",
   4: "May",
   5: "June",
   6: "July",
   7: "August",
   8: "September",
   9: "October",
   10: "November",
   11: "December",
};

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
