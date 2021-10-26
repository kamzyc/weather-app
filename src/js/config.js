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

export const ICONS = {
   "800d": i800d,
   "800n": i800n,
   "801d": i801d,
   "801n": i801n,
   "802dn": i802,
   "803_804dn": i803_804,
   "700dn": i700,
   "600_601_620_621d": i600_601_620_621d,
   "600_601_620_621n": i600_601_620_621n,
   "602_622dn": i602_622,
   "611_612_613_615_616dn": i611_612_613_615_616,
   "500_501_520_521d": i500_501_520_521d,
   "500_501_520_521n": i500_501_520_521n,
   "502_503_504_522_531dn": i502_503_504_522_531,
   "511dn": i511,
   "300dn": i300,
   "210_211_230dn": i210_211_230,
   "200_201_202_231_232dn": i200_201_202_231_232,
   "212_221dn": i212_221,
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
