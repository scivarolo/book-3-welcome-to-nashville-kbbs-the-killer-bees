// Select the section in the DOM
let welcomePage = document.getElementById("welcome")
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
  let headerImg = imgCreationFactory("img", "img/kbbs-welcome-to-nashville-header.jpg", "Welcome to Nashville", {clazz: "welcomeImage", id: null})

  let exitButton = elementFactory("div", "X", {clazz: "welcomeExit", id: "welcomeExit"}, null)
  let nameInput = elementFactory("input", null, {clazz: "welcomeInput", id: "welcomeNameInput"}, "text", null, "please enter your name", null)
  // console.log(nameInput);
  let nameInputButton = elementFactory("button", "Next", {clazz: "nameInputButton", id: "welcomeNameInputButton"}, null)
  let welcomeInformation = elementFactory("section", null, {clazz: "welcomeInformation", id: null}, null, null, null, null, nameInput, nameInputButton)
  let welcomePageWrapper = elementFactory("section", null, {clazz: "welcomePageWrapper", id: "welcomePageWrapper"}, null, null, null, null, exitButton, headerImg, welcomeInformation )
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
  })
}

function clearWelcomeInput(){
  nameInput.addEventListener("click", ()=>{
    nameInput.placeholder = " ";
  })
}

function exitButtonEvent(){
  let exitButton = document.getElementById("welcomeExit")
  exitButton.addEventListener("click", ()=>{
    welcomePage.style.display = "none"
  })
}

// Create event listener on button click that captures the input and passes it into a variable

function captureNameInput(){
  let nameInputButton = document.getElementById("welcomeNameInputButton");
  let itineraryName = " "

  nameInputButton.addEventListener("click", ()=>{
    // console.log("the name input button was clicked")
    if (nameInput.value === ""){
      alert("Please enter your name")
    } else{
      itineraryName = nameInput.value;
      // console.log(itineraryName);
      welcomePage.style.display = "none";
    }
  })
}

// Capture input and pass to JSON and other portions of page