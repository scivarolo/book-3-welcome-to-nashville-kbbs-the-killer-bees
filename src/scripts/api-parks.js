const API = {
  getItinerary() {
    return fetch("http://localhost:8088/itinerary")
      .then(itinerary => itinerary.json());
  },
  saveItinerary(temp) {
    return fetch("http://localhost:8088/itinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(temp)
    })
      .then(itinerary => itinerary.json())
      .then(() => API.getItinerary());
  },
  getParkData(parkSearchInput) {
    return fetch("https://data.nashville.gov/resource/xbru-cfzi.json")
      .then(parkData => parkData.json())
      .then(parks => {
        HTMLPRINT.parkPrint(parks);
      });
  },
  getParkDataName(parkSearchInput) {
    return fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=vjf6dPX8amlDVGkcMqfSlOAfn&park_name=${parkSearchInput}`)
      .then(parkData => parkData.json())
      .then(parks => {
        if (parks.length === 0) {
          alert("There isn't a park by that name. Try another name. Make sure to spell it out completely including Park or Field (ie \"Shelby Park\" or \"Potters Field\").");
        } else {
          document.getElementById("parkInputContainer").innerHTML = null;
          HTMLPRINT.parkPrint(parks);
        }
      });
  },
  getParkDataFeature(parkSearchInput) {
    return fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=vjf6dPX8amlDVGkcMqfSlOAfn${parkSearchInput}`)
      .then(parkData => parkData.json())
      .then(parks => {
        if (parks.length === 0) {
          alert("There isn't a park with those specific features. Please reset the search and try again.");
          document.getElementById("parkRadioContainer").innerHTML = null;
          HTMLPRINT.createParkSearch();
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