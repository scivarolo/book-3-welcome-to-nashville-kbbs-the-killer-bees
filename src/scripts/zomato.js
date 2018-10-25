const zomatoSearchBtn = document.querySelector("#zomatoInputBtn");
const zomatoInput = document.querySelector("#zomatoInput");

// This function captures the input from the Zomato search and converts it to a query string with +'s instaed of spaces.
function getZomatoSearch() {
  let queryString = zomatoInput.value;
  queryString = queryString.split(" ").join("+");
  return queryString;
}

// Add Event Listener to Zomato search button
zomatoSearchBtn.addEventListener("click", getZomatoSearch);

// Create a function output the results from Zomato into a list on the DOM


// Add Event Listener to Add to Itinerary Button

// Output desired restaurant to the Itinerary section