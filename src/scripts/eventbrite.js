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

function clearEventbriteSearch(){
  eventbriteSearchValue.value = "";
}

// ---EVENTBRITE RESULTS FUNCTIONS---
// Element Factory to create each of the HTML elements needed to display the results to the DOM
let elementFactory = (el, content, {clazz, id}, type, link, value, target,...children)=>{
  let element = document.createElement(el);
  if(el==="input" && type === "button"){
    element.setAttribute("type", type);
    element.value = value;
  } else if(el === "input"){
    element.setAttribute("placeholder", value);
  } else if(el === "a"){
    element.href=link;
    element.setAttribute("target", target);
  } else{
    element.innerHTML = content || null;
    children.forEach(child => {
      element.appendChild(child);
    });
  }
  element.setAttribute("id", id);
  element.setAttribute("class", clazz);
  return element;
};


// Used to reformat date provided via query to readable date
function getCorrectDate (eventDate){
  let datearr =`${eventDate}`.substring(0,10).split("-");
  [datearr[0], datearr[1], datearr[2]] = [datearr[1], datearr[2], datearr[0]];
  dateFormatted = datearr.join("/");
  return dateFormatted;
}

// Used to pass start time array to getCorrectTime function and hold the results in a new variable
function passEventStart(){
  eventStart.forEach((event)=>{
    getCorrectTime(event);
  });
  startTimeFormatted = timeFormatted;
  return startTimeFormatted;
}

// Used to pass end time array to getCorrectTime function and hold the results in a new variable
function passEventEnd(){
  eventEnd.forEach((event)=>{
    getCorrectTime(event);
  });
  endTimeFormatted = timeFormatted;
  return endTimeFormatted;
}

// Used to reformat time provided via query to readable time
function getCorrectTime(eventTime){
  let timeArr = `${eventTime}`.substring(11,16).split(":");
  let morningEvening= "am";
  if(timeArr[0] > 12){
    timeArr[0] = (timeArr[0]-12);
    morningEvening = "pm";
  } else if(timeArr[0] === 0){
    timeArr[0] = 12;
  }else{
    timeArr[0] = timeArr[0].substring(1);
  }
  updatedTime = timeArr.join(":");
  timeArr = [];
  timeArr.unshift(updatedTime, morningEvening);
  timeFormatted = timeArr.join(" ");
  return timeFormatted;
}

// Used to filter through venue information and prevent any null responses from displaying in the DOM
function vettingVenue(eventVenue, eventAddressArr){
  if(eventVenue === " " || eventVenue === null){
    eventAddressAndVenue = elementFactory("p", eventAddressArr, {clazz: null, id: null}, null, null, null, null);
  } else{
    eventAddressAndVenue = elementFactory("p", `${eventVenue} | ${eventAddressArr}`, {clazz: null, id: null}, null, null, null, null);
  }
  return eventAddressAndVenue;
}

// Takes results passed through fetch and calls correct date and element factory functions. Takes returned values and appends them to the results section of the DOM
function eventbriteQueryResults (eventsar){
  eventsar.forEach(events =>{
    // Event Date
    let eventDate = events.start.local;
    getCorrectDate(eventDate);

    // Event Start and End Time
    eventStart.push(events.start.local);
    eventEnd.push(events.end.local);
    passEventStart();
    passEventEnd();
    let dateAndTime = elementFactory("h4", `${dateFormatted} | ${startTimeFormatted}-${endTimeFormatted}`, {clazz: null, id: `search-result-date-${events.id}`}, null);

    // Event Venue and Address
    let eventAddressArr = events.venue.address.localized_multi_line_address_display.join(" ");
    let eventVenue = events.venue.name;
    vettingVenue(eventVenue, eventAddressArr);
    let eventAddress = eventAddressAndVenue;

    // Get tickets link and button
    let ticketLink = elementFactory("a", null, {clazz: null, id: null}, null, `${events.url}`, null, "_blank");
    let ticketButton = elementFactory("input", null, {clazz: "ticket-button", id: `button-tickets-${events.id}`}, "button", null, "Get Tickets");
    ticketLink.appendChild(ticketButton);

    // Event Name
    let eventName = elementFactory("h3", events.name.text, {clazz: null, id: `search-result-name-${events.id}`}, null);

    // Add to itinerary button
    let selectionButton = elementFactory("button", "Add to Itinerary", {clazz: "add-button", id: `button-select-${events.id}`}, null);

    // Individual Result Wrapper Section
    let eventResult = elementFactory("section", null, {clazz: "single-result", id: `search-result-${events.id}`}, null, null, null, null, eventName, dateAndTime, eventAddress, ticketLink, selectionButton);
    fragment.appendChild(eventResult);
  });
  eventbriteResults.appendChild(fragment);
  clearEventbriteSearch();
  addItineraryListeners();
  }

  // Clears Results section once an event is selected to be added to the itinerary
  function clearEventbriteResults(){
    eventbriteResults.innerHTML = "";
  }

  // ---EVENTBRITE ITINERARY FUNCTIONS---
  function eventbriteButtonChanges (){
    let button = document.querySelector(".itinerary__eventbrite button");
    button.textContent = "Remove";
    button.classList.remove("add-button");
    button.classList.add("remove-button");
    button.addEventListener("click", (event)=>{
      event.target.parentNode.remove();
    });
  }

  function populateEventbriteItinerary(result){
    let eventbriteItinerary = document.querySelector(".itinerary__eventbrite");
    if (eventbriteItinerary === ""){
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

function pullSelectedElement (ID){
  let eventbriteSelectedResult = document.querySelector(`#search-result-${ID}`);
  populateEventbriteItinerary(eventbriteSelectedResult);
};