// API Fetch Commands
fetch(myapi) //Need to update to API and include key
.then((fooddata)= fooddata.json()) //Need to update names
.then((realdata)=>{ //Need to update
  realdata.forEach((food)=>{ // Need to update, loop over data and return to function
    localFood = food
    fetch(theirapi)
    .then((apiFoodItem)=> apiFoodItem.json())
    .then((convertedFood => {
      let fragment = document.createDocumentFragment()
      let title = elementFactory ("h3", food.name, {
        id: null,
        class: "foodTitle"
      })
      let ingredients = elementFacotry ("p", convertedFood.product.ingredients_text, {
        id: null,
        class: "foodIngredients"
      })
      let foodListItem = elementFactory ("li", null, {id: "foodItem", clazz: "foodItem"}, title, ingredients)

      fragment.appendChild(foodListItem)

      foodList.appendChild (fragment)
    }))
  })
})