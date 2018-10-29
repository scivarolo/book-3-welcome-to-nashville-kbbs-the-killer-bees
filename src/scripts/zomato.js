const zomatoSearchBtn = document.querySelector("#zomatoInputBtn");
const zomatoTrendingBtn = document.querySelector("#zomatoTrendingBtn");
const zomatoInput = document.querySelector("#zomatoInput");
const zomatoResultsSection = document.querySelector(".results__zomato");

// This function captures the input from the Zomato search and converts it to a query string with +'s instaed of spaces.
function getZomatoSearch() {
  let queryString = zomatoInput.value;
  queryString = queryString.split(" ").join("+");
  queryString = `&q=${queryString}`;
  clearZomatoResults();
  zomatoAPI.request(queryString)
    .then(results => outputZomatoResults(results));
}

function getZomatoTrending() {
  let queryString = "&collection_id=1";
  clearZomatoResults();
  zomatoAPI.request(queryString)
    .then(results => outputZomatoResults(results));
}


// Element Factory for Zomato Results

function zElFactory(el, attributesObj, content, ...children) {
  let element = document.createElement(el);
  //Set Attributes
  for (let attr in attributesObj) {
    element.setAttribute(attr, attributesObj[attr]);
  }
  element.textContent = content || null;
  children.forEach(child => {
    element.appendChild(child);
  });
  return element;
}

// This function outputs the results from Zomato into a list on the DOM
// Then adds Event Listeners to the Add buttons.
function outputZomatoResults(results) {
  let zFrag = document.createDocumentFragment();

  restaurants = results.restaurants;
  zomatoInput.value = null;
  restaurants.forEach((result) => {

    let h3 = zElFactory("h3", {}, result.restaurant.name);
    let h4 = zElFactory("h4", {}, result.restaurant.location.address);

    let rating = zElFactory("p", {class: "restaurant-rating"}, `Rating: ${result.restaurant.user_rating.aggregate_rating} based on ${result.restaurant.user_rating.votes} reviews`);
    let price = zElFactory("p", {class: "average-price"}, `Average Price for Two: $${result.restaurant.average_cost_for_two}`);
    let button = zElFactory("button", {class: "add-button results__zomato__add"}, "Add to Itinerary");

    let additional;
    if (result.restaurant.has_table_booking === 1) {
      let resBtn = zElFactory("button", {class: "reservation-button"}, "Book a Table");
      let reservationEl = zElFactory("a", {href: result.restaurant.book_url, target:"_blank"}, null, resBtn);
      additional = zElFactory("section", {class: "additional-data"}, null, rating, price, reservationEl);
    } else {
      additional = zElFactory("section", {class: "additional-data"}, null, rating, price);
    }

    let section = zElFactory("section", {class: "single-result"}, null, h3, h4, additional, button);
    zFrag.appendChild(section);
  });

  zomatoResultsSection.appendChild(zFrag);
  addToItinEventListeners();
}

// Add Event Listener to Zomato search button
zomatoSearchBtn.addEventListener("click", getZomatoSearch);
zomatoTrendingBtn.addEventListener("click", getZomatoTrending);

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
  itinerarySection.innerHTML = `<section class="single-result">${desiredRestaurant.innerHTML}</section>`;
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