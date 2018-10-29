// EVENTS ARRAY WITH GENRE ID
let genreId = "";
const genreArray = [{
    id: "KnvZfZ7vAeA",
    name: "ROCK"
  },
  {
    id: "KnvZfZ7vAvt",
    name: "METAL"
  },
  {
    id: "KnvZfZ7vAv6",
    name: "COUNTRY"
  },
  {
    id: "KnvZfZ7vAv1",
    name: "HIP-HOP"
  },
  {
    id: "KnvZfZ7vAv1",
    name: "RAP"
  },
  {
    id: "KnvZfZ7vAev",
    name: "POP"
  },
  {
    id: "KnvZfZ7vAvd",
    name: "BLUES"
  },
  {
    id: "KnvZfZ7vAvl",
    name: "OTHER"
  },
  {
    id: "KnvZfZ7vAvv",
    name: "ALTERNATIVE"
  },
  {
    id: "KnvZfZ7vAde",
    name: "BASKETBALL"
  },
  {
    id: "KnvZfZ7vAdE",
    name: "FOOTBALL"
  },
  {
    id: "KnvZfZ7vAdI",
    name: "HOCKEY"
  },
  {
    id: "",
    name: "ALL"
  },
];

// the following function evaluates the search input takes the event type dropdown value and text input and sends it to the api query
const findGenreId = () => {
  let genreInput = document.getElementById("songkickInput").value;
  let genreSelectType = document.getElementById("songkickEventTypeSelect").value;
  // this evaluates the text input and throws an alert if empty
  if (genreInput === "" && genreSelectType === "music") {
    alert("Please enter a genre to search.\nTry 'country' or 'rock' or 'rap', etc.\nIf you're up for anything, just type 'all'");
  } else if (genreInput === "" && genreSelectType === "sports") {
    alert("Please enter a sport to search.\nTry 'football' or 'hockey', etc.\nIf you're up for anything, just type 'all'");
  } else {
    // this converts the text input to uppercase
    let genreInputText = genreInput.toUpperCase();
    genreInputText.toUpper;
    // the following function sends the selected values to the api query
    genreArray.forEach(genreArrayObject => {
      if (genreArrayObject.name === genreInputText) {
        genreId = genreArrayObject.id;
        // the following clears the events array and results from the DOM
        eventAndDate = [];
        songkickResults.innerHTML = "";
        ticketmasterFetch(genreSelectType, genreId);
      }
    });
  }
};

let songkickResults = document.querySelector(".results__songkick");
let songkickItinerary = document.querySelector(".itinerary__songkick");

const clickEventBtn = () => {
  findGenreId();
};

// the following array is created from the api results
let eventAndDate = [];
const allEvents = (returnedEvents) => {
  returnedEvents._embedded.events.forEach(element => {
    let currentEvent = {};
    currentEvent.id = element.id;
    currentEvent.name = element.name;
    currentEvent.date = element.dates.start.localDate;
    currentEvent.venue = element._embedded.venues[0].name;
    currentEvent.url = element.url;
    currentEvent.image = element.images[0].url;
    eventAndDate.push(currentEvent);
  });
  makeComponentFromArray(eventAndDate);
};

let resultsSection = document.getElementById("results");
resultsSection.classList.add("hidden");
let itinerarySection = document.getElementById("itinerary");
itinerarySection.classList.add("hidden");

let eventSelections = document.getElementById("songkickEventTypeSelect");

function makeComponentFromArray(array) {
  document.getElementById("songkickInput").value = null;
  array.forEach(event => {
    // reformat date function
    let reformattedDate = event.date;
    getCorrectDate(reformattedDate);

    // let newEntry = document.createElement("section");
    // newEntry.className = "single-result shadow";
    let eventImage = buildEl("img", {
      src: event.image,
      alt: event.name,
      width: "200"
    });
    let eventImgDiv = buildEl("div", {
      class: "img-wrapper"
    }, null, eventImage);

    let eventName = buildEl("h3", {}, event.name);
    // the following line contains the reformatted date
    let eventDateAndVenue = buildEl("h4", {}, `${dateFormatted}: ${event.venue}`);
    let eventLinkButton = buildEl("button", {
      class: "ticket-button"
    }, "Get Tickets");
    let eventLink = buildEl("a", {
      target: "_blank"
    }, null, eventLinkButton);
    let eventLinkP = buildEl("p", {}, null, eventLink);
    let addToItineraryBtn = buildEl("button", {
      id: event.id,
      name: "event",
      class: "add-button"
    }, "Add to Itinerary");

    resultsSection.classList.remove("hidden");

    let newEntry = buildEl("section", {
      class: "single-result"
    }, null, eventImgDiv, eventName, eventDateAndVenue, eventLinkP, addToItineraryBtn);

    songkickResults.appendChild(newEntry);
    let addButton = document.getElementById(`${event.id}`);
    addButton.addEventListener("click", function addEventToItineraryFunction() {
      addEventToItinerary(newEntry);
      addButton.removeEventListener("click", addEventToItineraryFunction);
    });
  });
}

function addEventToItinerary(temp) {
  if (songkickItinerary.innerHTML !== "") {
    alert("You've already added an event to this category.\nYour current selection will be replace the prior one.");
    songkickItinerary.innerHTML = "";
  }
  songkickResults.innerHTML = "";
  songkickItinerary.appendChild(temp);
  let btn = document.querySelector(".itinerary__songkick button");
  btn.textContent = "Remove";
  btn.className = "remove-button";
  btn.addEventListener("click", (event) => {
    event.target.parentNode.remove();
  });
};


let genreSearchBtn = document.getElementById("songkickInputBtn");
genreSearchBtn.addEventListener("click", clickEventBtn);