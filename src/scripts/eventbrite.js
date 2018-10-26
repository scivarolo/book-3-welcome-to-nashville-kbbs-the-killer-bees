// Eventbrite Variable Declaration
let eventbriteButton = document.getElementById("eventbriteInputBtn");
let eventbriteResults = document.querySelector(".results__eventbrite");
let fragment = document.createDocumentFragment();
let eventbriteSearchValue = document.getElementById("eventbriteInput");
let dateFormatted = " ";
// let testImage = document.getElementById("image__test")
// console.log(testImage)


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

// Description.text
// start time, end time
// start.local substring(11,15)
// end.local substring (11, 15), will need to translate this into traditional hours instead of military clock
// is_free
// Look at ways to refactor the search options

// function getCorrectTime(startTime, endTime){
//   let eventStartTime = `${startTime}`.substring(11,16).split(":");
//   let eventEndTime = `${endTime}`.substring(11,16).split(":")
//   let morningEvening = "";
//   console.log(eventStartTime);
//   updatingStartTime(eventStartTime);
//   // console.log(eventEndTime);
//   function updatingStartTime(startTime){
//     console.log(startTime)
//     if(startTime[0]>12){
//       let adjustedHour= startTime[0]-12
//       console.log(adjustedHour)
//       let adjustedMinute = startTime[1]
//       console.log(adjustedMinute)
//       morningEvening = "p.m."
//       let adjustedTime = `${adjustedHour}:${adjustedMinute}${morningEvening}`
//       console.log(adjustedTime)
//       return adjustedTime
//     } else if(startTime[0] <12){
//       let existingHour = startTime[0]
//       console.log(existingHour)
//       let existingMinute = startTime[1]
//       console.log(existingMinute)
//       morningEvening = "a.m."
//       let existingTime = `${existingHour}:${existingMinute}${morningEvening}`
//       console.log(adjustedTime)
//       return existingTime
//     }
  // }
  // function updatingEndTime(endTime){
  //   if(endTime[0]>12){
  //     let adjustedHour= endTime[0]-12
  //     console.log(adjustedHour)
  //     let adjustedMinute = endTime[1]
  //     console.log(adjustedMinute)
  //     morningEvening = "p.m."
  //     let adjustedTime = `${adjustedHour}:${adjustedMinute}${morningEvening}`
  //     return adjustedTime
  //   } else if(endTime[0] <12){
  //     let existingHour = endTime[0]
  //     console.log(existingHour)
  //     let existingMinute = endTime[1]
  //     console.log(existingMinute)
  //     morningEvening = "a.m."
  //     let existingTime = `${existingHour}:${existingMinute}${morningEvening}`
  //     return existingTime
  //   }
  // }
// }


// Takes results passed through fetch and calls correct date and element factory functions. Takes returned values and appends them to the results section of the DOM
function eventbriteQueryResults (eventsar){
  eventsar.forEach(events =>{
    let eventDate = events.start.local;
    getCorrectDate(eventDate);
    // let startTime = events.start.local;
    // let endTime = events.end.local;
    // getCorrectTime(startTime, endTime);

    let dateAndVenue = elementFactory("h4", `${dateFormatted} | ${events.venue.name}`, {clazz: null, id: `search-result-date-${events.id}`}, null);
    let eventName = elementFactory("h3", events.name.text, {clazz: null, id: `search-result-name-${events.id}`}, null);
    let selectionButton = elementFactory("button", "Add to Itinerary", {clazz: "add-button", id: `button-select-${events.id}`}, null);

    let ticketLink = elementFactory("a", null, {clazz: null, id: null}, null, `${events.url}`, null, "_blank")
    let ticketButton = elementFactory("input", null, {clazz: "ticket-button", id: `button-tickets-${events.id}`}, "button", null, "Get Tickets")
    ticketLink.appendChild(ticketButton)

    let eventResult = elementFactory("section", null, {clazz: "single-result", id: `search-result-${events.id}`}, null, null, null, null, eventName, dateAndVenue, selectionButton, ticketLink);
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
    let button = document.querySelector(".itinerary__eventbrite button")
    button.textContent = "Remove";
    button.classList.remove("add-button");
    button.classList.add("remove-button");
    button.addEventListener("click", (event)=>{
      event.target.parentNode.remove()
    })
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