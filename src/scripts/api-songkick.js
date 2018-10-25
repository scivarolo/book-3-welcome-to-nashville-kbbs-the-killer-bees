
const ticketmasterFetch = (genreId) => {
    fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&classificationName=music&genreId=${genreId}&apikey=70cai802ln0eXrPLJlPp0XFVzAlQxR69&size=5`)
    .then(ticketmaster => ticketmaster.json())
    .then(parsed => {
        allEvents(parsed);
    });
};


// const ticketmasterFetchSports = () => {
//     fetch("https://app.ticketmaster.com/discovery/v2/events.json?city=nashville&classificationName=sports&apikey=70cai802ln0eXrPLJlPp0XFVzAlQxR69")
//     .then(ticketmaster => ticketmaster.json())
//     .then(parsed => {
//         allSportsEvents(parsed);
//     });
// };