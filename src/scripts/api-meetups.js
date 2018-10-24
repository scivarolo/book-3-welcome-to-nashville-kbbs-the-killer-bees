// API Fetch Commands
let allEvents = []
let eventGroup = []
let fragment = document.createDocumentFragment()
fetch("http://localhost:8088/events")
.then(eventdata => eventdata.json())
.then((events)=>{
  events.forEach((event)=>{ // Need to update, loop over data and return to function
    allEvents.push(event);
  })
  // console.log(allEvents)
  return allEvents
})
    // eventGroup.push(event.group);
    // let eventResult = elementFacotry("li", event.name, event.group.name, {
    //     id: something,
    //     clazz: something
    //   })
  // let meetupEvents = elementFactory("ul", null, {
  //   id: something,
  //   clazz: something
  // }, eventResult)


  // let title = elementFactory ("h3", food.name, {
  //   id: null,
  //   class: "foodTitle"
  // })
  // let ingredients = elementFacotry ("p", convertedFood.product.ingredients_text, {
  //   id: null,
  //   class: "foodIngredients"
  // })
  // let foodListItem = elementFactory ("li", null, {id: "foodItem", clazz: "foodItem"}, title, ingredients)
  // let results = elementFactory("ul", null, {
  //   id: null,
  //   clazz: "something"
  // })

  // fragment.appendChild(foodListItem)

  // foodList.appendChild (fragment)
// Topic Category[Outdoors & Adventure, Tech, Family, Health & Wellness, Sports & Fitness, ]

