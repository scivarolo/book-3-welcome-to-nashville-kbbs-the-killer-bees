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
    id: "camping_available_by_permit",
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
const parkSearchPlaceholder = document.querySelector(".search__parks");
const savedItin = document.querySelector("#savedItineraries");
let featureString = "";
let searchResults = [];
let addedItem = {};



// This section adds event listeners when html elements are dynamically created.
const ADDLISTENERS = {
  removeItinEvent() {
    document.querySelector(".itinerary__parks .remove-button").addEventListener("click", HANDLEEVENT.removeFromItin);
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
  saveToDatabase() {
    console.log(document.querySelector(".itinerary__zomato").innerHTML);
    if (document.querySelector(".itinerary__zomato").innerHTML === "" && document.querySelector(".itinerary__songkick").innerHTML === "" && document.querySelector(".itinerary__parks").innerHTML === "" && document.querySelector(".itinerary__eventbrite").innerHTML === "") {
      alert("Please place at least 1 event in the itinerary to save it.");
    } else {
      let newEvent = {};
      let stringItinerary = "";
      stringItinerary = document.querySelector(".itinerary__zomato").innerHTML;
      newEvent.zomato = stringItinerary;
      stringItinerary = document.querySelector(".itinerary__songkick").innerHTML;
      newEvent.songkick = stringItinerary;
      stringItinerary = document.querySelector(".itinerary__parks").innerHTML;
      newEvent.parks = stringItinerary;
      stringItinerary = document.querySelector(".itinerary__eventbrite").innerHTML;
      newEvent.eventbrite = stringItinerary;
      console.log(newEvent);
      API.saveItinerary(newEvent).then(itins => {
        savedItin.innerHTML = null;
        itins.forEach(itin => HTMLPRINT.printSaved(itin))
      });
      document.getElementById("results").innerHTML = "";
    }
  },
  parkItin() {
    searchResults.forEach(park => {
      if (park.park_name === event.target.id) {
        addedItem = park;
      };
    });
    HTMLPRINT.placeInItin(addedItem);
  },
  parkSearch() {
    let parkSearchInput = document.getElementById("parksInput").value;
    if (parkSearchInput === "") {
      alert("You must enter a name to be able to search. Try again.");
    } else {
      API.getParkDataName(parkSearchInput);
    }
  },
  parkFeatureSearch() {
    parkPlaceholder.innerHTML = null;
    featureString += "&" + event.target.name + "=Yes";
    API.getParkDataFeature(featureString);
  },
  removeFromItin() {
    document.querySelector(".itinerary__parks").innerHTML = null;
    document.getElementById("parkRadioContainer").innerHTML = null;
    HTMLPRINT.createParkSearch();
  }
};

// This section handles the creation of html elements and posts to html page.
const HTMLPRINT = {
  printSaved(itin) {
    if (itin !== undefined) {
      let eachItin = document.createElement("article");
      eachItin.setAttribute("class", "savedItinEvents");
      let food = document.createElement("div");
      food.setAttribute("class", "itinerary__zomato");
      food.innerHTML = itin.zomato;
      eachItin.appendChild(food);
      let music = document.createElement("div");
      music.setAttribute("class", "itinerary__songkick");
      music.innerHTML = itin.songkick;
      eachItin.appendChild(music);
      let park = document.createElement("div");
      park.setAttribute("class", "itinerary__parks");
      park.innerHTML = itin.parks;
      eachItin.appendChild(park);
      let meeting = document.createElement("div");
      meeting.setAttribute("class", "itinerary__eventbrite");
      meeting.innerHTML = itin.eventbrite;
      eachItin.appendChild(meeting);
      savedItin.appendChild(eachItin);
    }
  },
  createParkSearch() {
    document.getElementById("parkInitialSelector").innerHTML = `
    <fieldset class="parkInput">
      <label for="mainPark" class="labelName">Search Parks By</label>
      <select type="text" class="selectBox" onchange="HTMLPRINT.parkMenuEventHandler()" name="mainPark" id="mainPark">
      <option value="0">Select An Option</option>
      <option value="1">Park Name</option>
      <option value="2">Park Features</option>
      <option value="3">See All Parks</option>
    </fieldset>`;
  },
  parkMenuEventHandler() {
    if (event.target.value === "1") {
      document.getElementById("parkRadioContainer").innerHTML = null;
      parkPlaceholder.innerHTML = null;
      document.getElementById("parkInputContainer").innerHTML = `
        <label for="parksInput">Enter Name of Park</label></input>
        <input type="text" name="parksInput" id="parksInput" placeholder="Enter Name (ie Shelby Park, Potters Field, Centennial Park")>
        <button id="parksInputBtn">Search</button>`;
      document.getElementById("parksInputBtn").addEventListener("click", HANDLEEVENT.parkSearch);
    } else if (event.target.value === "2") {
      featureString = "";
      parkPlaceholder.innerHTML = null;
      document.getElementById("parkInputContainer").innerHTML = null;
      let formContent = "";
      features.forEach(rdButton => {
        formContent += `<section class="indivBox">
              <label for="${rdButton.id}" class="radioName">${rdButton.text}</label>
              <input type="radio" class="radioBox" onclick="HANDLEEVENT.parkFeatureSearch()" name="${rdButton.id}" id="featureBtn">
            </section>`;
      });
      let rdContainer = document.getElementById("parkRadioContainer");
      rdContainer.innerHTML = formContent;
    } else if (event.target.value === "3") {
      parkPlaceholder.innerHTML = null;
      document.getElementById("parkInputContainer").innerHTML = null;
      document.getElementById("parkRadioContainer").innerHTML = null;
      API.getParkData();
    } else if (event.target.value === "0") {
      parkPlaceholder.innerHTML = null;
      document.getElementById("parkInputContainer").innerHTML = null;
      document.getElementById("parkRadioContainer").innerHTML = null;
    };
  },
  placeInItin(park) {
    if (parkItinPlaceholder.innerHTML === "") {
      parkPlaceholder.innerHTML = null;
      document.getElementById("parkRadioContainer").innerHTML = null;
      let outerContainer = document.createElement("section");
      outerContainer.setAttribute("class", "single-result");
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
      removeButton.innerHTML = "Remove";
      removeButton.setAttribute("class", "remove-button");
      outerContainer.appendChild(removeButton);
      parkItinPlaceholder.appendChild(outerContainer);
      ADDLISTENERS.removeItinEvent();
    } else {
      alert("You already have a parked saved. Please remove the current park and then add a new one.");
    }
  },
  parkPrint(parks) {

    // if (document.getElementById("parksInput").value !== null) {
    //   document.getElementById("parksInput").value = null;
    // };
    searchResults = parks;
    let parkContainer = document.createDocumentFragment();
    let searchCount = parks.length;
    let countString = document.createElement("p");
    countString.innerHTML = "Your search has " + searchCount + " results.";
    parkContainer.appendChild(countString);
    parks.forEach(park => {
      let outerContainer = document.createElement("section");
      outerContainer.setAttribute("class", "single-result");
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
      addButton.setAttribute("onclick", "HANDLEEVENT.parkItin()");
      addButton.setAttribute("id", park.park_name);
      addButton.innerHTML = "Add to Itinerary";
      addButton.setAttribute("class", "add-button");
      outerContainer.appendChild(addButton);
      parkContainer.appendChild(outerContainer);
      parkPlaceholder.appendChild(parkContainer);
    });
  },
  weatherPrint(weather) {
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
    tempDisplay.innerHTML = Math.ceil(currentTemp) + "&deg;";
    currentWeather.appendChild(tempDisplay);
    let tempCondition = document.createElement("p");
    tempCondition.setAttribute("id", "currentCondition");
    tempCondition.innerHTML = weather.weather[0].main;
    currentWeather.appendChild(tempCondition);
    document.body.appendChild(currentWeather);
  }
};


API.getWeatherData();
HTMLPRINT.createParkSearch();
API.getItinerary().then(events => events.forEach(event => HTMLPRINT.printSaved(event)));