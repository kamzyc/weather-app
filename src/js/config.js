import dotenv from "dotenv";

import clearSkyDayIcon from "url:../imgs/clear-sky-day.svg";
import clearSkyNightIcon from "url:../imgs/clear-sky-night.svg";

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
   800: { d: clearSkyDayIcon, n: clearSkyNightIcon },
};
