// All global variables that need to be declared
let eventbriteButton = document.getElementById("eventbriteInputBtn")
const eventbriteResults = document.querySelector(".results__eventbrite")
let fragment = document.createDocumentFragment()
let eventbriteSearchValue = document.getElementById("eventbriteInput")

// Eventlistener on button, takes input and calls function to fetch data from API, pass in parameter with search terms
// Meetup input button id="eventbriteInputBtn"
eventbriteButton.addEventListener("click", ()=>{
  eventbriteCategoryMatch(eventbriteSearchValue.value)
})


// Takes data from API and makes a new element
let elementFactory = (el, content, {clazz}, ...children)=>{
  let element = document.createElement(el)
  element.innerHTML = content || null
  children.forEach(child => {
    element.appendChild(child)
  })
  element.setAttribute("class", clazz)
  return element
}

// Display element in results portion of the DOM
function eventbriteQueryResults (eventsar){
  eventsar.forEach(events =>{
    let date = events.start.local
    let dateFormatted = " "
    function getCorrectDate (date){
      let datearr =`${date}`.substring(0,10).split("-");
      [datearr[0], datearr[1], datearr[2]] = [datearr[1], datearr[2], datearr[0]]
      dateFormatted = datearr.join("/")
      return dateFormatted
    }
    getCorrectDate(date)
    let selectionButton = elementFactory("button", "Save", {clazz: "eventbrite__button"})
    let eventResult = elementFactory("p", `${dateFormatted}: ${events.name.text}`, {clazz: "eventbrite__result"}, selectionButton)
    fragment.appendChild(eventResult)
  })
  eventbriteResults.appendChild(fragment);
  }

// Event listener on results portion of the DOM that takes selected element and passes it to itenary section


// Display selected element in itenary portion of the DOM
// DOM section is class="itinerary__eventbrite"
let eventbriteItinerarySelector = document.querySelectorAll(".eventbrite__button")
eventbriteItinerarySelector.forEach((button)=>{
  button.addEventListener("click", ()=>{

  })
})

// Void additional inputs from that section
function clearEventbriteSearch(){
  eventbriteSearchValue.value = ''
}

function clearEventbriteResults(){
  eventbriteResults = ''
}
// DOM section is class="search__eventbrite"
