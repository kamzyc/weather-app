import dotenv from "dotenv";

import clearSkyDayIcon from "url:../imgs/icons/800d.svg";
import clearSkyNightIcon from "url:../imgs/icons/800n.svg";

dotenv.config();
export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL;

export const NUM_HOURS = 24; // max 48
export const NUM_DAYS = 8; // max 8

export const DATE_OPTIONS = {
   LONG: {
      day: "numeric",
      weekday: "long",
      month: "short",
      hour: "2-digit",
      hour12: true,
      minute: "2-digit",
   },
   SHORT: { day: "numeric", weekday: "short", month: "short" },
   ONLY_TIME: { hour: "2-digit", minute: "2-digit" },
};

export const ICONS_MATRIX = {
   800: clearSkyDayIcon,
};

console.log(import.meta);

/*
800: d n
8xx:  
      801  d n
      802 
      803, 804
7xx:
      701, ...
6xx:
      600, 601, 620, 621 - d n
      602, 622
      611, 612, 613, 615, 616
5xx:
      500, 501, 520, 521 - d n
      502, 503, 504, 522, 531
      511
3xx: 
      300, ...
2xx:
      210, 211, 230
      200, 201, 202, 231, 232
      212, 221

*/
