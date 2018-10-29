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
  let headerImg = imgCreationFactory("img", "img/kbbs-welcome-to-nashville-header.jpg", "Welcome to Nashville", {clazz: "welcomeImage", id: null});

  let exitButton = elementFactory("div", "X", {clazz: "welcomeExit", id: "welcomeExit"}, null);

  let welcomeTitle = elementFactory("p", "Start Planning Your Trip to Nashville", {clazz: "welcomePageGreeting", id: "welcomePageGreeting"}, null);
  let contentSection = elementFactory("section", null, {clazz: "welcomeContent", id: "welcomeContent"}, null);
  contentSection.appendChild(welcomeTitle);

  let nameInput = elementFactory("input", null, {clazz: "welcomeInput", id: "welcomeNameInput"}, "text", null, "Name Your Itinerary", null);
  let nameInputButton = elementFactory("button", "Next", {clazz: "nameInputButton", id: "welcomeNameInputButton"}, null);
  let welcomeInformation = elementFactory("section", null, {clazz: "welcomeInformation", id: null}, null, null, null, null, nameInput, nameInputButton);
  contentSection.appendChild(welcomeInformation);

  let welcomePageWrapper = elementFactory("section", null, {clazz: "welcomePageWrapper", id: "welcomePageWrapper"}, null, null, null, null, exitButton, headerImg, contentSection);
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