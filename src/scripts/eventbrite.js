// Eventbrite Variable Declaration
let eventbriteButton = document.getElementById("eventbriteInputBtn");
let eventbriteResults = document.querySelector(".results__eventbrite");
let fragment = document.createDocumentFragment();
let eventbriteSearchValue = document.getElementById("eventbriteInput");
let dateFormatted = " ";
let timeFormatted = " ";
let updatedTime = " ";
let updatedHour = " ";
let eventStart = [];
let eventEnd = [];
let startTimeFormatted = " ";
let endTimeFormatted = " ";
let eventAddressAndVenue = " ";


// ---EVENTBRITE SEARCH FUNCTIONS---

function clearEventbriteSearch() {
  eventbriteSearchValue.value = "";
}

// ---EVENTBRITE RESULTS FUNCTIONS---

// Used to filter through venue information and prevent any null responses from displaying in the DOM
function vettingVenue(eventVenue, eventAddressArr) {
  if (eventVenue === " " || eventVenue === null) {
    eventAddressAndVenue = elementFactory("p", eventAddressArr, {
      clazz: null,
      id: null
    }, null, null, null, null);
  } else {
    eventAddressAndVenue = elementFactory("p", `${eventVenue} | ${eventAddressArr}`, {
      clazz: null,
      id: null
    }, null, null, null, null);
  }
  return eventAddressAndVenue;
}

// Takes results passed through fetch and calls correct date and element factory functions. Takes returned values and appends them to the results section of the DOM
function eventbriteQueryResults(eventsar) {
  eventsar.forEach(events => {
    // Event Date
    let eventDate = events.start.local;
    getCorrectDate(eventDate);

    // Event Start and End Time
    eventStart.push(events.start.local);
    eventEnd.push(events.end.local);
    passEventStart();
    passEventEnd();
    let dateAndTime = buildEl("h4", {
      id: `search-result-date-${events.id}`
    }, `${dateFormatted} | ${startTimeFormatted}-${endTimeFormatted}`);

    // Event Venue and Address
    let eventAddressArr = events.venue.address.localized_multi_line_address_display.join(" ");
    let eventVenue = events.venue.name;
    vettingVenue(eventVenue, eventAddressArr);
    let eventAddress = eventAddressAndVenue;

    // Get tickets link and button
    let ticketLink = buildEl("a", {
      href: events.url,
      target: "_blank"
    });
    let ticketButton = buildEl("button", {
      class: "ticket-button",
      id: `button-tickets-${events.id}`
    }, "Get Tickets");
    ticketLink.appendChild(ticketButton);

    // Event Name
    let eventName = buildEl("h3", {
      id: `search-result-name-${events.id}`
    }, events.name.text);

    // Add to itinerary button
    let selectionButton = buildEl("button", {
      class: "add-button",
      id: `button-select-${events.id}`
    }, "Add to Itinerary");

    // Individual Result Wrapper Section
    let eventResult = buildEl("section", {
      class: "single-result",
      id: `search-result-${events.id}`
    }, null, eventName, dateAndTime, eventAddress, ticketLink, selectionButton);
    fragment.appendChild(eventResult);
  });
  eventbriteResults.appendChild(fragment);
  clearEventbriteSearch();
  addItineraryListeners();
}

// Clears Results section once an event is selected to be added to the itinerary
function clearEventbriteResults() {
  eventbriteResults.innerHTML = "";
}

// ---EVENTBRITE ITINERARY FUNCTIONS---
function eventbriteButtonChanges() {
  let button = document.querySelector(".itinerary__eventbrite button");
  button.textContent = "Remove";
  button.classList.remove("add-button");
  button.classList.add("remove-button");
  button.addEventListener("click", (event) => {
    event.target.parentNode.remove();
  });
}

function populateEventbriteItinerary(result) {
  let eventbriteItinerary = document.querySelector(".itinerary__eventbrite");
  if (eventbriteItinerary === "") {
    eventbriteItinerary.appendChild(result);
    eventbriteButtonChanges();
    clearEventbriteResults();
  } else {
    eventbriteItinerary.innerHTML = "";
    eventbriteItinerary.appendChild(result);
    eventbriteButtonChanges();
    clearEventbriteResults();
  }
}

function pullSelectedElement(ID) {
  let eventbriteSelectedResult = document.querySelector(`#search-result-${ID}`);
  populateEventbriteItinerary(eventbriteSelectedResult);
};