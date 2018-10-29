// API Fetch Commands
let eventbriteAllEvents = [];

let eventbriteCategoryMatch = (input) => {

  let eventbriteInput = input;
  fetch ("http://localhost:8088/categories")
  .then((categories)=> categories.json())
  .then((categories) => {
    for( let i = 0; i <categories.length; i++ ){
      let categoryString = categories[i].name.toLowerCase().toString();
      if(categoryString.match(eventbriteInput.toLowerCase())){
        eventbriteQuery(categories[i].id);
      };
    };
  });
};

let eventbriteQuery = (categoryId)=> {
  let eventbriteCategoryId = categoryId;
  fetch(`https://www.eventbriteapi.com/v3/events/search/?location.latitude=36.174465&location.longitude=-86.767960&sort_by=date&expand=venue&categories=${eventbriteCategoryId}`, {
    headers: {
      "Authorization": "Bearer YYBDMC5M4VVDSX36DL6Y"
    }
  }).then((eventdata) => eventdata.json())
  .then((eventdata) => eventdata.events)
  .then((events)=> {
    eventbriteAllEvents.push(events);
    eventbriteAllEvents.forEach(event=> eventbriteQueryResults(event));
  });
};

