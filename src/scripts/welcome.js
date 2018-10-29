// Select the section in the DOM
let welcomePage = document.getElementById("welcome")

// Create function that creates innerHTML of Welcome Screen
let welcomeFragment = document.createDocumentFragment();
function makeWelcomePage (){
  let nameInput = elementFactory("input", null, {clazz: "welcomeInput", id: null}, "text", null, "please enter your name", null)
  console.log(nameInput);
  let nameInputButton = elementFactory("button", "Next", {clazz: "nameInputButton", id: null}, null)
  let welcomeInformation = elementFactory("section", null, {clazz: "welcomeInformation", id: null}, null, null, null, null, nameInput, nameInputButton)
  welcomeFragment.appendChild(welcomeInformation);
  welcomePage.appendChild(welcomeFragment);
}
makeWelcomePage();

// Create event listener that loads welcome page upon page load

// Create event listner on button click that captures the input and passes it into a variable

// Capture input and pass to JSON and other portions of page