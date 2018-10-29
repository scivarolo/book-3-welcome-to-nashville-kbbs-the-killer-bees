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



// This function outputs the results from Zomato into a list on the DOM
// Then adds Event Listeners to the Add buttons.
function outputZomatoResults(results) {
  let fragment = document.createDocumentFragment();

  restaurants = results.restaurants;
  zomatoInput.value = null;
  restaurants.forEach((result) => {
    let thisRes = result.restaurant;
    let h3 = buildEl("h3", {}, thisRes.name);
    let h4 = buildEl("h4", {}, thisRes.location.address);

    let rating = buildEl("p", {
      class: "restaurant-rating"
    }, `Rating: ${thisRes.user_rating.aggregate_rating} based on ${thisRes.user_rating.votes} reviews`);
    let price = buildEl("p", {
      class: "average-price"
    }, `Average Price for Two: $${thisRes.average_cost_for_two}`);
    let button = buildEl("button", {
      class: "add-button results__zomato__add"
    }, "Add to Itinerary");

    let additional;
    if (thisRes.has_table_booking === 1) {
      let resBtn = buildEl("button", {
        class: "reservation-button"
      }, "Book a Table");
      let resAttrs = {
        href: thisRes.book_url,
        target: "_blank"
      };
      let reservationEl = buildEl("a", resAttrs, null, resBtn);
      additional = buildEl("section", {
        class: "additional-data"
      }, null, rating, price, reservationEl);
    } else {
      additional = buildEl("section", {
        class: "additional-data"
      }, null, rating, price);
    }

    let section = buildEl("section", {
      class: "single-result"
    }, null, h3, h4, additional, button);
    fragment.appendChild(section);
  });

  zomatoResultsSection.appendChild(fragment);
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