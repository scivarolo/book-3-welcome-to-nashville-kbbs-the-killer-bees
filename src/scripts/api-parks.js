const API = {
  getParkData(parkSearchInput) {
    return fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?park_name=${parkSearchInput}&$$app_token=vjf6dPX8amlDVGkcMqfSlOAfn`)
      .then(parkData => parkData.json())
      .then(parks => {
        if (parks.length === 0) {
          alert("There isn't a park by that name. Try another name. Make sure to spell it out completely including Park or Field (ie \"Shelby Park\" or \"Potters Field\").");
        } else {
          HTMLPRINT.parkPrint(parks);
        }
      });
  },
  getWeatherData() {
    return fetch("http://api.openweathermap.org/data/2.5/weather?id=5003243&APPID=a548d815b5b0c783e575bf8fa9904085")
      .then(nashWeather => nashWeather.json())
      .then(forecast => {
        HTMLPRINT.weatherPrint(forecast);
      });
  }
};