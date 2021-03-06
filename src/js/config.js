import dotenv from "dotenv";

// clear sky
import i800d from "url:../imgs/icons/800d.svg";
import i800n from "url:../imgs/icons/800n.svg";

// clouds
import i801d from "url:../imgs/icons/801d.svg";
import i801n from "url:../imgs/icons/801n.svg";
import i802 from "url:../imgs/icons/802.svg";
import i803_804 from "url:../imgs/icons/803_804.svg";

// atmosphere
import i700 from "url:../imgs/icons/700.svg";

// snow
import i600_601_620_621d from "url:../imgs/icons/600_601_620_621d.svg";
import i600_601_620_621n from "url:../imgs/icons/600_601_620_621n.svg";
import i602_622 from "url:../imgs/icons/602_622.svg";
import i611_612_613_615_616 from "url:../imgs/icons/611_612_613_615_616.svg";

// rain
import i500_501_520_521d from "url:../imgs/icons/500_501_520_521d.svg";
import i500_501_520_521n from "url:../imgs/icons/500_501_520_521n.svg";
import i502_503_504_522_531 from "url:../imgs/icons/502_503_504_522_531.svg";
import i511 from "url:../imgs/icons/511.svg";

// drizzle
import i300 from "url:../imgs/icons/300.svg";

// thuderstorm
import i210_211_230 from "url:../imgs/icons/210_211_230.svg";
import i200_201_202_231_232 from "url:../imgs/icons/200_201_202_231_232.svg";
import i212_221 from "url:../imgs/icons/212_221.svg";

// icons
import iUmbrella from "url:../imgs/icons/umbrella.svg";

dotenv.config();
export const API_KEY = process.env.API_KEY;
export const API_URL = process.env.API_URL;

export const CLASSNAMES = {
   CURRENT_WEATHER: "current-weather",
   HOURLY: "hourly",
   DAILY: "daily",
   WIND: "wind",
   COMFORT_LEVEL: "comfort-level",
   STATUS: "status",
   PANEL: "panel",
};

export const NUM_HOURS = 24; // max 48
export const NUM_DAYS = 8; // max 8
export const MIN_IN_HOUR = 60;
export const SEC_IN_MIN = 60;
export const BASE_ICON_ROTATION = -45; // base rotation of arrow (wind) icon

export const DATE_OPTIONS = {
   LONG: {
      day: "numeric",
      weekday: "long",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
   },
   SHORT: { day: "numeric", weekday: "short", month: "short" },
   ONLY_TIME: { hour: "2-digit", minute: "2-digit", hour12: false },
};

// each number (seperated by _) in key = id of weather conditions
export const ICONS = {
   "800d": i800d,
   "800n": i800n,
   "801d": i801d,
   "801n": i801n,
   "802dn": i802,
   "803_804dn": i803_804,
   "701_711_721_731_741_751_761_762_771_781dn": i700,
   "600_601_620_621d": i600_601_620_621d,
   "600_601_620_621n": i600_601_620_621n,
   "602_622dn": i602_622,
   "611_612_613_615_616dn": i611_612_613_615_616,
   "500_501_520_521d": i500_501_520_521d,
   "500_501_520_521n": i500_501_520_521n,
   "502_503_504_522_531dn": i502_503_504_522_531,
   "511dn": i511,
   "300_301_302_310_311_312_313_314_321dn": i300,
   "210_211_230dn": i210_211_230,
   "200_201_202_231_232dn": i200_201_202_231_232,
   "212_221dn": i212_221,
   umbrella: iUmbrella,
};

export const BG = {
   "800d": "day",
   "800n": "night",
   "801_902_803_804dn": "clouds",
   "701_711_721_731_741_751_761_762_771_781dn": "mist",
   "600_601_620_621_602_622_611_612_613_615_616dn": "snow",
   "500_501_520_512_502_503_504_522_531_511dn": "rain",
   "300_301_302_310_311_312_313_314_321dn": "rain",
   "200_201_202_210_211_212_221_230_231_232dn": "thunderstorm",
};

export const CHART_CONFIG = {
   TYPE: "doughnut",
   CUTOUT: "90%",
   BG_COLOR_DATA: "rgb(242, 243, 243)",
   BG_COLOR_FREE: "rgba(242, 243, 243, 0.1)",
   BORDER_RADIUS: 5,
};

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
