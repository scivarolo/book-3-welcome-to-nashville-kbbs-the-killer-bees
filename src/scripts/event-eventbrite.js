// Eventlistener on search button. Calls API function to fetch category data, pass to full API query.
eventbriteButton.addEventListener("click", ()=>{

  eventbriteCategoryMatch(eventbriteSearchValue.value);
});

// Eventlistener on results portion of the DOM that takes selected element and passes it to itenary section.
function addItineraryListeners (){
  let eventbriteResultSelector = document.querySelectorAll(".add-button");
  eventbriteResultSelector.forEach((button)=>{
    button.addEventListener("click",(selectedButton)=>{
      itineraryId = selectedButton.target.id.substring(14,25);
      pullSelectedElement(itineraryId);
    });
  });
}