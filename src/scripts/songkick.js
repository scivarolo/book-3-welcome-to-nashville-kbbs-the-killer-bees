const eventAndDate = [];
const allMusicEvents = (returnedMusicEvents) => {
    console.log(returnedMusicEvents);
    returnedMusicEvents._embedded.events.forEach(element => {
        let currentEvent = {};
        currentEvent.id = element.id;
        currentEvent.name = element.name;
        currentEvent.date = element.dates.start.localDate;
        eventAndDate.push(currentEvent);
    });
    console.log("Music Event and date: ", eventAndDate);
};
// ticketmasterFetch();

// sort event and Date array
// const eventAndDate.sort

let songkickResults = document.querySelector('.results__songkick');


const sportsEventAndDate = [];
const allSportsEvents = (returnedSportsEvents) => {
    console.log("returned sports events:", returnedSportsEvents);
    returnedSportsEvents._embedded.events.forEach(element => {
        let currentEvent = {};
        currentEvent.id = element.id;
        currentEvent.name = element.name;
        currentEvent.date = element.dates.start.localDate;
        sportsEventAndDate.push(currentEvent);
    });
};


ticketmasterFetchSports();
ticketmasterFetch();


let eventSelections = document.getElementById('songkickEventTypeSelect');


function makeComponentFromArray(array){
    array.forEach(event => {
        let newEntry = document.createElement("p");
        let entryContents = `<strong>${event.date}:</strong> ${event.name} <input type="radio" id="addEvent" name="event"
        value="${event.id}" /> <label for="event">Add</label>`;
        newEntry.innerHTML = entryContents;
        songkickResults.appendChild(newEntry);
    });
}

function makeResults(){
    songkickResults.innerHTML = "";
    let eventSelected = eventSelections.value;
    if(eventSelected === "music"){
        // console.log("you selected music");
        makeComponentFromArray(eventAndDate);
    }
    else if(eventSelected === "sports"){
        // console.log("you selected sports");
        makeComponentFromArray(sportsEventAndDate);
    }
}

// create function to send search inputs to query database
// add function to songkick submit button



