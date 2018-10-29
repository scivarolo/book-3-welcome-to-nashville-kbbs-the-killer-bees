const searchNav = document.querySelectorAll(".search-tab");
const searchSections = document.querySelectorAll("[class^='search__']");
const searchHeading = document.querySelector(".search-heading");
const welcomeHeader = document.querySelector(".header__div img");
searchNav.forEach(tab => {
  tab.addEventListener("click", (event) => {
    switchSearchTabs(event);
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
    welcomeHeader.setAttribute("src", "img/kbbs-restaurants-header.jpg");
  }
  if (clickedTab.textContent === "Music/Sports") {
    searchSections[1].classList.add("show");
    document.querySelector(".results__songkick").classList.add("show");
    welcomeHeader.setAttribute("src", "img/kbbs-music-sports-header.jpg");
  }
  if (clickedTab.textContent === "Parks") {
    searchSections[2].classList.add("show");
    document.querySelector(".results__parks").classList.add("show");
    welcomeHeader.setAttribute("src", "img/kbbs-parks-header.jpg");
  }
  if (clickedTab.textContent === "Events") {
    searchSections[3].classList.add("show");
    document.querySelector(".results__eventbrite").classList.add("show");
    welcomeHeader.setAttribute("src", "img/kbbs-events-header.jpg");
  }
}