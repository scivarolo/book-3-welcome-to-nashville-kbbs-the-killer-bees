// Select the section in the DOM
let welcomePage = document.getElementById("welcome")

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
  // let headerImgWrapper = elementFactory("div", null, {clazz: "welcomeImageWrapper", id: null}, null);
  let headerImg = imgCreationFactory("img", "img/kbbs-welcome-to-nashville-header.jpg", "Welcome to Nashville", {clazz: "welcomeImage", id: null})
  // console.log(headerImg)
  // headerImgWrapper.appendChild(headerImg)
  let exitButton = elementFactory("div", "X", {clazz: "welcomeExit", id: "welcomeExit"}, null)
  let nameInput = elementFactory("input", null, {clazz: "welcomeInput", id: null}, "text", null, "please enter your name", null)
  // console.log(nameInput);
  let nameInputButton = elementFactory("button", "Next", {clazz: "nameInputButton", id: null}, null)
  let welcomeInformation = elementFactory("section", null, {clazz: "welcomeInformation", id: null}, null, null, null, null, nameInput, nameInputButton)
  let welcomePageWrapper = elementFactory("section", null, {clazz: "welcomePageWrapper", id: "welcomePageWrapper"}, null, null, null, null, headerImg, exitButton, welcomeInformation )
  // welcomeFragment.appendChild(headerImg);
  // welcomeFragment.appendChild(exitButton);
  // welcomeFragment.appendChild(welcomeInformation);
  welcomeFragment.appendChild(welcomePageWrapper);
  welcomePage.appendChild(welcomeFragment);
}
makeWelcomePage();

// I need to add an event listener that when some section of the page loads, it calls this function to create my popup.

// Create event listener that loads welcome page upon page load
// function popup(mylink, windowname) {
//   if (! window.focus)return true;
//   var href;
//   if (typeof(mylink) == 'string')
//   href=mylink;
//   else href=mylink.href;
//   window.open(href, windowname, 'width=400,height=200,scrollbars=yes');
//   return false; }

// onClick = myFunction

// function showWelcome (){
//   welcomePage.classList.toggle("show")
// }

let body = document.querySelector("body");
console.log(body)

body.addEventListener("onLoad", ()=>{
  console.log("the event listener has been added")
  welcomePage.classList.toggle("show")
})
// function myFunction(){
//   var popup = get element by id("myPopup")
//   popup.classList.toggle("show")
// }
// Event Listener for exit button

let exitButton = document.getElementById("welcomeExit")
exitButton.addEventListener("click", ()=>{
  // console.log("the button was clicked")
  // welcomePage.classList.toggle("show");
  welcomePage.style.visibility = "hidden"
})

// Create event listner on button click that captures the input and passes it into a variable

// Capture input and pass to JSON and other portions of page