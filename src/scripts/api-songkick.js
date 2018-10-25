const ticketmasterFetch = () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&classificationName=music&apikey=70cai802ln0eXrPLJlPp0XFVzAlQxR69")
    .then(ticketmaster => ticketmaster.json())
    .then(parsed => {
        allMusicEvents(parsed);
    });
};


const ticketmasterFetchSports = () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&classificationName=sports&apikey=70cai802ln0eXrPLJlPp0XFVzAlQxR69")
    .then(ticketmaster => ticketmaster.json())
    .then(parsed => {
        allSportsEvents(parsed);
    });
};