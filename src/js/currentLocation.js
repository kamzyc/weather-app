class CurrentLocation {
   _name = "";
   _lat = null;
   _lon = null;
   _units = "metric";

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

   get units() {
      return this._units;
   }

   set units(units) {
      this._units = units;
   }

   swapUnits = () => {
      this._units = this._units === "metric" ? "imperial" : "metric";
   };
}

export default new CurrentLocation();
