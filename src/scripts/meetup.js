// Eventlistener on button, takes input and calls function to fetch data from API, pass in parameter with search terms

// Meetup input button id="meetupInputBtn"

// Takes data from API and makes a new element
// Add element factory code
// let elementFactory = (el, content, {id, clazz}, ...children)=>{
//   let element = document.createElement(el)
//   element.innerHTML = content || null
//   children.forEach(child => {
//     element.appendChild(child)
//   })
//   element.setAttribute("id", id)
//   element.setAttribute("class", clazz)
//   return element
// }

// Display element in results portion of the DOM
// DOM section is class="results__meetups"


let meetupResults = (events) =>{
  let fragment = document.createDocumentFragment()
  let meetupEvents = elementFactory("ul", null, null, null, {clazz: "meetup__allResults"})
  events.forEach((event)=>{
    let eventResult = elementFactory("li", event.name, event.group.name, event.local_date, {clazz: "meetup__result"})
    fragment.appendChild(eventResult)
    // return eventResult
  })
  selectora.appendChild(fragment)
}

// Event listener on results portion of the DOM that takes selected element and passes it to itenary section


// Display selected element in itenary portion of the DOM
// DOM section is class="itinerary__meetups"

// Void additional inputs from that section
// DOM section is class="search__meetups"