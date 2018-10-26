// MUSIC EVENTS
let genreId = "";
const genreArray = [
    {id: "KnvZfZ7vAeA", name: "ROCK"},
    {id: "KnvZfZ7vAvt", name: "METAL"},
    {id: "KnvZfZ7vAv6", name: "COUNTRY"},
    {id: "KnvZfZ7vAv1", name: "HIP-HOP"},
    {id: "KnvZfZ7vAv1", name: "RAP"},
    {id: "KnvZfZ7vAev", name: "POP"},
    {id: "KnvZfZ7vAvd", name: "BLUES"},
    {id: "KnvZfZ7vAvl", name: "OTHER"},
    {id: "KnvZfZ7vAvv", name: "ALTERNATIVE"},
    {id: "KnvZfZ7vAde", name: "BASKETBALL"},
    {id: "KnvZfZ7vAdE", name: "FOOTBALL"},
    {id: "KnvZfZ7vAdI", name: "HOCKEY"},
    {id: "", name: "ALL"},
];

const findGenreId = () => {
    let genreInput = document.getElementById("songkickInput").value;
    let genreSelectType = document.getElementById("songkickEventTypeSelect").value;
    if (genreInput === "" && genreSelectType === "music") {
        alert("Please enter a genre to search.\nTry 'country' or 'rock' or 'rap', etc.\nIf you're up for anything, just type 'all'");
      } else if (genreInput === "" && genreSelectType === "sports") {
        alert("Please enter a sport to search.\nTry 'football' or 'hockey', etc.\nIf you're up for anything, just type 'all'");
      } else {
    console.log("Select Type: ", genreSelectType);
    console.log(genreInput);
    let genreInputText = genreInput.toUpperCase();
    genreInputText.toUpper;
    console.log(genreInputText);
    genreArray.forEach(genreArrayObject => {
        if(genreArrayObject.name === genreInputText) {
            genreId = genreArrayObject.id;
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

const eventAndDate = [];
const allEvents = (returnedEvents) => {
    console.log(returnedEvents);
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
    console.log("Event and date: ", eventAndDate);
    makeComponentFromArray(eventAndDate);
};

let resultsSection = document.getElementById("results");
resultsSection.classList.add("hidden");
let itinerarySection = document.getElementById("itinerary");
itinerarySection.classList.add("hidden");

let eventSelections = document.getElementById("songkickEventTypeSelect");
function makeComponentFromArray(array){
    document.getElementById("songkickInput").value = null;
    array.forEach(event => {
        let newEntry = document.createElement("section");
        newEntry.className = "single-result shadow";
        let eventImage = `<div><img src="${event.image}" alt="${event.name}" width="200"></img></div>`;
        let eventName = `<h3>${event.name}</h3>`;
        let eventDateAndVenue =`<h4><strong>${event.date}:</strong> ${event.venue}</h4>`;
        let eventLink = `<p><a href="${event.url}" target=”_blank” class="buyTix">Buy Tickets</a></p>`;
        let addToItineraryBtn = `<button id="${event.id}" name="event" value="${event.id}" class="add-button">Add to Itinerary</button>`;
        let entryContents = `${eventImage}${eventName}${eventDateAndVenue}${eventLink}${addToItineraryBtn}`;
        newEntry.innerHTML = entryContents;
        resultsSection.classList.remove("hidden");
        songkickResults.appendChild(newEntry);
        console.log(newEntry);
        let addButton = document.getElementById(`${event.id}`);
        addButton.addEventListener("click", ()=>addEventToItinerary(newEntry));
    });
}

function addEventToItinerary(temp){
    itinerarySection.classList.remove("hidden");
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