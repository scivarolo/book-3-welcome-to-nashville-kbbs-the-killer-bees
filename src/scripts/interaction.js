let searchNav = document.querySelectorAll(".search-tab");
let searchSections = document.querySelectorAll("[class^='search__']");
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

  if (clickedTab.textContent === "Restaurants") {
    searchSections[0].classList.add("show");
  }
  if (clickedTab.textContent === "Concerts") {
    searchSections[1].classList.add("show");
  }
  if (clickedTab.textContent === "Parks") {
    searchSections[2].classList.add("show");
  }
  if (clickedTab.textContent === "Events") {
    searchSections[3].classList.add("show");
  }
}