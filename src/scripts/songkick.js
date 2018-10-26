// MUSIC EVENTS
let genreId = "";
const genreArray = [
    {id: "KnvZfZ7vAeA", name: "ROCK"},
    {id: "KnvZfZ7vAvt", name: "METAL"},
    {id: "KnvZfZ7vAv6", name: "COUNTRY"},
    {id: "KnvZfZ7vAv1", name: "HIP-HOP"},
    {id: "KnvZfZ7vAv1", name: "RAP"}
];

const findGenreId = () => {
    let genreInput = document.getElementById("songkickInput").value;
    console.log(genreInput);
    let genreInputText = genreInput.toUpperCase();
    genreInputText.toUpper;
    console.log(genreInputText);
    genreArray.forEach(genreArrayObject => {
        if(genreArrayObject.name === genreInputText) {
            genreId = genreArrayObject.id;
            ticketmasterFetch(genreId);
        }
    });
};

let songkickResults = document.querySelector(".results__songkick");
let songkickItinerary = document.querySelector(".itinerary__songkick");

const clickEventBtn = () => {
    findGenreId();
};

const eventAndDate = [];
const allEvents = (returnedEvents) => {
    console.log(returnedEvents);
    returnedEvents._embedded.events.forEach(element => {
        let currentEvent = {};
        currentEvent.id = element.id;
        currentEvent.name = element.name;
        currentEvent.date = element.dates.start.localDate;
        currentEvent.venue = element._embedded.venues[0].name;
        eventAndDate.push(currentEvent);
    });
    console.log("Event and date: ", eventAndDate);
    makeComponentFromArray(eventAndDate);
};

// let btn = document.createElement("button");

let eventSelections = document.getElementById("songkickEventTypeSelect");
function makeComponentFromArray(array){
    document.getElementById("songkickInput").value = null;
    array.forEach(event => {
        let newEntry = document.createElement("section");
        newEntry.className = "single-result";
        let eventName = `<h3>${event.name}</h3>`;
        let eventDateAndVenue =`<h4><strong>${event.date}:</strong> ${event.venue}</h4>`;
        let addToItineraryBtn = `<button id="${event.id}" name="event" value="${event.id}" class="add-button">Add to Itinerary </button>`;
        let entryContents = `${eventName}${eventDateAndVenue}${addToItineraryBtn}`;
        newEntry.innerHTML = entryContents;
        songkickResults.appendChild(newEntry);
        console.log(newEntry);
        let addButton = document.getElementById(`${event.id}`);
        addButton.addEventListener("click", ()=>addEventToItinerary(newEntry));
    });
}

function addEventToItinerary(temp){
    console.log("you clicked me");
    songkickItinerary.appendChild(temp);
    songkickResults.innerHTML = null;
    let btn = document.querySelector(".itinerary__songkick button");
    btn.textContent = "Remove from Itinerary";
    btn.className = "remove-button";
    btn.addEventListener("click", (event) => {
        event.target.parentNode.remove();
    });
};




// function makeResults(){
//     songkickResults.innerHTML = "";
//     let eventSelected = eventSelections.value;
//     if(eventSelected === "music"){
//         console.log("you selected music");
//         makeComponentFromArray(eventAndDate);
//     }
//     else if(eventSelected === "sports"){
//         console.log("you selected sports");
//     }
// }


let genreSearchBtn = document.getElementById("songkickInputBtn");
genreSearchBtn.addEventListener("click", clickEventBtn);