// Eventbrite Variable Declaration
let eventbriteButton = document.getElementById("eventbriteInputBtn");
let eventbriteResults = document.querySelector(".results__eventbrite");
let fragment = document.createDocumentFragment();
let eventbriteSearchValue = document.getElementById("eventbriteInput");
let dateFormatted = " ";


// ---EVENTBRITE SEARCH FUNCTIONS---

function clearEventbriteSearch(){
  eventbriteSearchValue.value = "";
}

// ---EVENTBRITE RESULTS FUNCTIONS---
// Element Factory to create each of the HTML elements needed to display the results to the DOM
let elementFactory = (el, content, {clazz, id}, type, link, value, target,...children)=>{
  let element = document.createElement(el);
  if(el==="input"){
    element.setAttribute("type", type)
    element.value = value;
  } else if(el === "a"){
    element.href=link;
    element.setAttribute("target", target)
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
// Takes results passed through fetch and calls correct date and element factory functions. Takes returned values and appends them to the results section of the DOM
function eventbriteQueryResults (eventsar){
  eventsar.forEach(events =>{
    let eventDate = events.start.local;
    getCorrectDate(eventDate);

    let dateAndVenue = elementFactory("h4", `${dateFormatted} | ${events.venue.name}`, {clazz: null, id: `search-result-date-${events.id}`}, null);
    let eventName = elementFactory("h3", events.name.text, {clazz: null, id: `search-result-name-${events.id}`}, null);
    let selectionButton = elementFactory("button", "Add to Itinerary", {clazz: "add-button", id: `button-select-${events.id}`}, null);

    let ticketLink = elementFactory("a", null, {clazz: null, id: null}, null, `${events.url}`, null, "_blank")
    let ticketButton = elementFactory("input", null, {clazz: "ticket-button", id: `button-tickets-${events.id}`}, "button", null, "Get Tickets")
    ticketLink.appendChild(ticketButton)

    let eventResult = elementFactory("section", null, {clazz: "single-result", id: `search-result-${events.id}`}, null, null, null, null, eventName, dateAndVenue, ticketLink, selectionButton);
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