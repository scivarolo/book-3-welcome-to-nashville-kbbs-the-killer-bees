const zomatoSearchBtn = document.querySelector("#zomatoInputBtn");
const zomatoInput = document.querySelector("#zomatoInput");
const zomatoResultsSection = document.querySelector(".results__zomato");

// This function captures the input from the Zomato search and converts it to a query string with +'s instaed of spaces.
function getZomatoSearch() {
  let queryString = zomatoInput.value;
  queryString = queryString.split(" ").join("+");
  zomatoAPI.request(queryString)
    .then(results => outputZomatoResults(results));
}

// This function outputs the results from Zomato into a list on the DOM
// Then adds Event Listeners to the Add buttons.
function outputZomatoResults(results) {
  restaurants = results.restaurants;
  zomatoInput.value = null;
  restaurants.forEach((restaurant) => {
    zomatoResultsSection.innerHTML += `
      <section class="single-result">
        <h3>${restaurant.restaurant.name}</h3>
        <h4>${restaurant.restaurant.location.address}</h4>
        <section class="additional-data">
          <p class="average-price">Average Price for Two: $${restaurant.restaurant.average_cost_for_two}</p>
        </section>
        <button class="add-button results__zomato__add">Add to Itinerary</button>
      </section>
    `;
  });
  addToItinEventListeners();
}

// Add Event Listener to Zomato search button
zomatoSearchBtn.addEventListener("click", getZomatoSearch);


// Add Event Listener to Add to Itinerary Buttons
function addToItinEventListeners() {
  let addButtons = zomatoResultsSection.querySelectorAll(".single-result button");
  addButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      zomatoAddToItinerary(event.target);
    });
  });
}

function clearZomatoResults() {
  zomatoResultsSection.innerHTML = "";
}

// Output desired restaurant to the Itinerary section
function zomatoAddToItinerary(clickedButton) {
  let desiredRestaurant = clickedButton.parentNode;
  let itinerarySection = document.querySelector(".itinerary__zomato");
  itinerarySection.innerHTML = `<section>${desiredRestaurant.innerHTML}</section>`;
  itinerarySection.querySelector(".additional-data").remove();
  let button = itinerarySection.querySelector("button");
  button.textContent = "Remove";
  button.classList.remove("add-button");
  button.classList.add("remove-button");
  button.addEventListener("click", (event) => {
    event.target.parentNode.remove();
  });
  clearZomatoResults();
}