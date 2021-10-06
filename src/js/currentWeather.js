class CurrentWeather {
   constructor() {
      this._name = "Current location";
      this._lat = null;
      this._lon = null;
      this._unit = "metric";
   }

   get name() {
      return this._name;
   }

   set name(name) {
      this._name = name;
   }

   get lat() {
      return this._lat;
   }

   set lat(lat) {
      this._lat = lat;
   }

   get lon() {
      return this._lon;
   }

   set lon(lon) {
      this._lon = lon;
   }

   get unit() {
      return this._unit;
   }

   set unit(unit) {
      this._unit = unit;
   }

   toogleUnit() {
      this._unit = this._unit === "metric" ? "imperial" : "metric";
   }
}

export default new CurrentWeather();
