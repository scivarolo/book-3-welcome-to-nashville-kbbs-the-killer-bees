// Select the section in the DOM
let welcomePage = document.getElementById("welcome");
let nameInput = " ";

function imgCreationFactory (el, source, alt, {clazz, id}){
  let element = document.createElement(el);
  element.src = source;
  element.alt = alt;
  element.setAttribute("id", id);
  element.setAttribute("class", clazz);
  return element;
}

// Create function that creates innerHTML of Welcome Screen
let welcomeFragment = document.createDocumentFragment();
function makeWelcomePage (){
  let headerImg = buildEl("img", {
    src: "img/kbbs-welcome-to-nashville-header.jpg",
    alt: "Welcome to Nashville",
    class: "welcomeImage"
  });
  let exitButton = buildEl("div", {class: "welcomeExit", id: "welcomeExit"}, "x");
  let welcomeTitle = buildEl("p", {class: "welcomePageGreeting", id: "welcomePageGreeting"}, "Start Planning Your Trip to Nashville");
  let contentSection = buildEl("section", {class: "welcomeContent", id: "welcomeContent"});
  contentSection.appendChild(welcomeTitle);

  let nameInput = buildEl("input", {class: "welcomeInput", id: "welcomeNameInput", type: "text", placeholder: "Name Your Itinerary" });
  let nameInputButton = buildEl("button", {class: "nameInputButton", id: "welcomeNameInputButton"}, "Next");
  let welcomeInformation = buildEl("section", {class: "welcomeInformation"}, null, nameInput, nameInputButton);
  contentSection.appendChild(welcomeInformation);

  let welcomePageWrapper = buildEl("section", {class: "welcomePageWrapper", id: "welcomePageWrapper"}, null, exitButton, headerImg, contentSection);
  welcomeFragment.appendChild(welcomePageWrapper);
  welcomePage.appendChild(welcomeFragment);
}

// Event Listener, calls makeWelcomePage function to create the welcome page upon content loading.

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", ()=>{
    makeWelcomePage();
    exitButtonEvent();
    captureNameInput();
    nameInput = document.getElementById("welcomeNameInput");
    clearWelcomeInput();
  });
}

function clearWelcomeInput(){
  nameInput.addEventListener("click", ()=>{
    nameInput.placeholder = " ";
  });
}

function exitButtonEvent(){
  let exitButton = document.getElementById("welcomeExit");
  exitButton.addEventListener("click", ()=>{
    welcomePage.style.display = "none";
  });
}

// Event listener on button click that captures the input and passes it into a variable

let itineraryName = " ";

function captureNameInput(){
  let nameInputButton = document.getElementById("welcomeNameInputButton");
  nameInputButton.addEventListener("click", ()=>{
    if (nameInput.value === ""){
      alert("Please enter your name");
    } else{
      itineraryName = nameInput.value;
      welcomePage.style.display = "none";
      if (itineraryName !== "") {
      itinName.innerHTML = itineraryName;
      }
    }
  });
}

// Capture input and pass to JSON and other portions of page