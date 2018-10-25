// This is where the text for park features is stored.
// The api has the id as the property name and has a value of Yes or No
const features = [
  {
    id: "ada_accessible",
    text: "ADA Accessible"
  },
  {
    id: "baseball_fields",
    text: "Baseball Fields"
  },
  {
    id: "basketball_courts",
    text: "Basketball Courts"
  },
  {
    id: "boat_launch",
    text: "Boat Launch"
  },
  {
    id: "camping_available",
    text: "Camping"
  },
  {
    id: "canoe_launch",
    text: "Canoe Launch"
  },
  {
    id: "community_center",
    text: "Community Center"
  },
  {
    id: "community_garden",
    text: "Community Garden"
  },
  {
    id: "disc_golf",
    text: "Disc Golf"
  },
  {
    id: "dog_park",
    text: "Dog Park"
  },
  {
    id: "fishing_by_permit",
    text: "Fishing By Permit"
  },
  {
    id: "football_multi_purpose_fields",
    text: "Football Fields"
  },
  {
    id: "golf_course",
    text: "Golf Course"
  },
  {
    id: "hiking_trails",
    text: "Hiking Trails"
  },
  {
    id: "historic_features",
    text: "Historic Sites"
  },
  {
    id: "horse_trails",
    text: "Horse Trails"
  },
  {
    id: "lake",
    text: "Lake"
  },
  {
    id: "mountain_bike_trails",
    text: "Mountain Bike Trails"
  },
  {
    id: "nature_center",
    text: "Nature Center"
  },
  {
    id: "picnic_shelters",
    text: "Picnic Shelters"
  },
  {
    id: "playground",
    text: "Playground"
  },
  {
    id: "restrooms_available",
    text: "Restrooms Available"
  },
  {
    id: "skate_park",
    text: "Skate Park"
  },
  {
    id: "swimming_pook",
    text: "Swimming Pool"
  },
  {
    id: "tennis_courts",
    text: "Tennis Courts"
  },
  {
    id: "volleyball",
    text: "Volleyball"
  },
  {
    id: "walk_jog_paths",
    text: "Walk/Jog Paths"
  }
];

// Sets variables to be used later for posting to DOM and for recording results and added events.
// These would be spread out if we dynamically create the html elements.
const parkPlaceholder = document.querySelector(".results__parks");
const parkItinPlaceholder = document.querySelector(".itinerary__parks");
let searchResults = [];
let addedItem = {};



// This section adds event listeners when html elements are dynamically created.
const ADDLISTENERS = {
  addItinEvent() {
    document.querySelector(".add-button").addEventListener("click", HANDLEEVENT.parkItin);
  },
  removeItinEvent() {
    document.querySelector(".remove-button").addEventListener("click", HANDLEEVENT.removeFromItin);
  }
};

// This section removes elements from previous blocks as it is moved to the next.
// If an event is added to the itinerary, it clears the search results block.
const CLEARPREVIOUS = {
  removeFromInput() {
    document.getElementById("parksInput").value = null;
  },
  removeFromResults() {
    document.querySelector(".results__parks").innerHTML = null;
  }
};

// This section handles triggered events from the search parks element and from the add to itinerary.
const HANDLEEVENT = {
  parkItin() {
    searchResults.forEach(park => {
      if (park.park_name === event.target.id) {
        addedItem = park;
      };
    });
    HTMLPRINT.placeInItin(addedItem);
  },
  parkSearch () {
    let parkSearchInput = document.getElementById("parksInput").value;
    if (parkSearchInput === "") {
      alert("You must enter a name to be able to search. Try again.");
    } else {
      API.getParkData(parkSearchInput);
    }
  },
  removeFromItin() {
    document.querySelector(".itinerary__parks").innerHTML = null;
  }
};

// This section handles the creation of html elements and posts to html page.
const HTMLPRINT = {
  placeInItin(park) {
    parkPlaceholder.innerHTML = null;
    let outerContainer = document.createElement("section");
    outerContainer.setAttribute("class", "single-result")
    let parkTitle = document.createElement("h3");
    parkTitle.innerHTML = park.park_name;
    outerContainer.appendChild(parkTitle);
    let parkAddress = document.createElement("h4");
    parkAddress.innerHTML = park.mapped_location_address;
    outerContainer.appendChild(parkAddress);
    let parkCity = document.createElement("h4");
    parkCity.innerHTML = `${park.mapped_location_city}, ${park.mapped_location_state}  `;
    if (park.mapped_location_zip !== undefined) {
      parkCity.innerHTML += park.mapped_location_zip;
    };
    outerContainer.appendChild(parkCity);
    let removeButton = document.createElement("button");
    removeButton.setAttribute("id", park.park_name);
    removeButton.innerHTML = "Remove From Itinerary";
    removeButton.setAttribute("class", "remove-button");
    outerContainer.appendChild(removeButton);
    parkItinPlaceholder.appendChild(outerContainer);
    ADDLISTENERS.removeItinEvent();
  },
  parkPrint(parks) {
    CLEARPREVIOUS.removeFromInput();
    searchResults = parks;
    let parkContainer = document.createDocumentFragment();
    parks.forEach(park => {
      let outerContainer = document.createElement("section");
      let parkTitle = document.createElement("h3");
      parkTitle.innerHTML = park.park_name;
      outerContainer.appendChild(parkTitle);
      let parkAddress = document.createElement("h4");
      parkAddress.innerHTML = park.mapped_location_address;
      outerContainer.appendChild(parkAddress);
      let parkCity = document.createElement("h4");
      parkCity.innerHTML = `${park.mapped_location_city}, ${park.mapped_location_state}  `;
      if (park.mapped_location_zip !== undefined) {
        parkCity.innerHTML += park.mapped_location_zip;
      }
      outerContainer.appendChild(parkCity);
      let parkFeatures = document.createElement("section");
      parkFeatures.setAttribute("class", "featuresName");
      parkFeatures.innerHTML = "Park Features<br>";
      for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        if (park[feature.id] === "Yes") {
          let indFeature = document.createElement("li");
          indFeature.setAttribute("class", "featureItem");
          indFeature.innerHTML = feature.text;
          parkFeatures.appendChild(indFeature);
        }
      }
      outerContainer.appendChild(parkFeatures);
      let addButton = document.createElement("button");
      addButton.setAttribute("id", park.park_name);
      addButton.innerHTML = "Add To Itineray"
      addButton.setAttribute("class", "add-button");
      outerContainer.appendChild(addButton);
      parkContainer.appendChild(outerContainer);
    });
    parkPlaceholder.appendChild(parkContainer);
    ADDLISTENERS.addItinEvent();
  },
  weatherPrint(weather) {
    console.log(weather);
    let currentWeather = document.createElement("div");
    currentWeather.setAttribute("id", "forecast");
    currentWeather.setAttribute("style", `background-image: url("http://openweathermap.org/img/w/${weather.weather[0].icon}.png"); background-size: contain; background-repeat: none`);
    let weatherStatement = document.createElement("p");
    weatherStatement.setAttribute("id", "weatherTag");
    weatherStatement.innerHTML = "Current Conditions For";
    currentWeather.appendChild(weatherStatement);
    let cityName = document.createElement("p");
    cityName.setAttribute("id", "cityName");
    cityName.innerHTML = weather.name;
    currentWeather.appendChild(cityName);
    let currentTemp = (weather.main.temp - 273.15) * 9 / 5 + 32;
    let tempDisplay = document.createElement("p");
    tempDisplay.setAttribute("id", "currentCondition");
    tempDisplay.innerHTML = Math.ceil(currentTemp) + '&deg;';
    currentWeather.appendChild(tempDisplay);
    let tempCondition = document.createElement("p");
    tempCondition.setAttribute("id", "currentCondition");
    tempCondition.innerHTML = weather.weather[0].main;
    currentWeather.appendChild(tempCondition);
    document.body.appendChild(currentWeather);
  }
};

// Sets initial event listener for the search button.
API.getWeatherData();
document.getElementById("parksInputBtn").addEventListener("click", HANDLEEVENT.parkSearch);
