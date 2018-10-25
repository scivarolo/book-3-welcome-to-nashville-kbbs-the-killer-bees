fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=70cai802ln0eXrPLJlPp0XFVzAlQxR69")
    .then(api-songkick => api-songkick.json())
    .then(api-parsed => {
        console.table(api-parsed)
    })