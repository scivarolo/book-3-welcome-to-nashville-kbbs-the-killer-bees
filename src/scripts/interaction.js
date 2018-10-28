let searchNav = document.querySelectorAll(".search-tab");
let searchSections = document.querySelectorAll("[class^='search__']");
let searchHeading = document.querySelector(".search-heading");
console.log(searchSections);
searchNav.forEach(tab => {
  tab.addEventListener("click", (event) => {
    switchSearchTabs(event)
  });
});

function switchSearchTabs(clickEvent) {
  let clickedTab = clickEvent.target;

  searchNav.forEach(tab => tab.classList.remove("active"));
  clickedTab.classList.add("active");
  searchSections.forEach(searchSection => searchSection.classList.remove("show"));
  document.querySelectorAll("[class^='results__']").forEach(section => section.classList.remove("show"));

  if (clickedTab.textContent === "Restaurants") {
    searchSections[0].classList.add("show");
    document.querySelector(".results__zomato").classList.add("show");
    // searchHeading.textContent = "Find Somewhere to Eat";
  }
  if (clickedTab.textContent === "Music/Sports") {
    searchSections[1].classList.add("show");
    document.querySelector(".results__songkick").classList.add("show");
    // searchHeading.textContent = "Find a Show or Sporting Event";
  }
  if (clickedTab.textContent === "Parks") {
    searchSections[2].classList.add("show");
    document.querySelector(".results__parks").classList.add("show");
    // searchHeading.textContent = "Find a Park";
  }
  if (clickedTab.textContent === "Events") {
    searchSections[3].classList.add("show");
    document.querySelector(".results__eventbrite").classList.add("show");
    // searchHeading.textContent = "Find an Event";
  }
}