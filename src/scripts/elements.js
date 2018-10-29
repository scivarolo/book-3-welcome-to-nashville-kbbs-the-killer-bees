// Used to reformat date provided via query to readable date
function getCorrectDate (eventDate){
  let datearr =`${eventDate}`.substring(0,10).split("-");
  [datearr[0], datearr[1], datearr[2]] = [datearr[1], datearr[2], datearr[0]];
  dateFormatted = datearr.join("/");
  return dateFormatted;
}

// Used to pass start time array to getCorrectTime function and hold the results in a new variable
function passEventStart(){
  eventStart.forEach((event)=>{
    getCorrectTime(event);
  });
  startTimeFormatted = timeFormatted;
  return startTimeFormatted;
}

// Used to pass end time array to getCorrectTime function and hold the results in a new variable
function passEventEnd(){
  eventEnd.forEach((event)=>{
    getCorrectTime(event);
  });
  endTimeFormatted = timeFormatted;
  return endTimeFormatted;
}

// Used to reformat time provided via query to readable time
function getCorrectTime(eventTime){
  let timeArr = `${eventTime}`.substring(11,16).split(":");
  let morningEvening= "am";
  if(timeArr[0] > 12){
    timeArr[0] = (timeArr[0]-12);
    morningEvening = "pm";
  } else if(timeArr[0] === 0){
    timeArr[0] = 12;
  }else{
    timeArr[0] = timeArr[0].substring(1);
  }
  updatedTime = timeArr.join(":");
  timeArr = [];
  timeArr.unshift(updatedTime, morningEvening);
  timeFormatted = timeArr.join(" ");
  return timeFormatted;
}

// Element Factory for Zomato and Eventbrite Results

function buildEl(el, attributesObj, content, ...children) {
  let element = document.createElement(el);
  //Set Attributes
  for (let attr in attributesObj) {
    element.setAttribute(attr, attributesObj[attr]);
  }
  element.textContent = content || null;
  children.forEach(child => {
    element.appendChild(child);
  });
  return element;
}