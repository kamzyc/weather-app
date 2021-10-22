import dotenv from "dotenv";

dotenv.config();
export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL;

export const NUM_HOURS = 24; // max 48
export const NUM_DAYS = 8; // max 8
