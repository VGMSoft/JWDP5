(() => {
  const itemsInCart = cart.getCartItems()
  displayCartProduct(itemsInCart)
  //cart.calcGlobalTotal()
})()

/*---------------------------------------- CART ----------------------------------------*/

//Display Cart Content
function displayCartProduct() {
  //Append Cart product Id in Product Array
  let productArray = cart.cartToArray()
  console.log(cart.cartToArray())
  //Tableau de produits
  console.log('Tableau de produits : ', productArray)
  for (let i in productArray) {
    // get template
    const template = document.querySelector("#template");
    // clone template
    const clone = document.importNode(template.content, true)
    //fill template
    totalProductPrice = cart.calcTotalProductPrice( i)
    clone.querySelector(".productName").innerHTML = productArray[i].name
    clone.querySelector(".quantity").value = productArray[i].quantity
    clone.querySelector(".unityPrice").innerHTML = productArray[i].price
    clone.querySelector(".totalPrice").innerHTML = `${totalProductPrice}€`
    clone.querySelector(".totalPrice").setAttribute("value", totalProductPrice)
    document.querySelector(".templateContainer").appendChild(clone);
  }
}
//global total
document.querySelector(".globalTotal").innerHTML = `${cart.calcGlobalTotal()}€`

//?
function modifyQuantity() {
  const quantity = window.document.querySelector(".quantity")
  const minus = window.document.querySelector(".buttonMinus")
  const plus = window.document.querySelector(".buttonPlus")
  quantity.value = 1
  minus.onclick = () => {
    quantity.value--
    cart.setCartItem()
  }
  plus.onclick = () => {
    quantity.value++
    cart.setCartItem()
  }
}

/*---------------------------------------- FORM ----------------------------------------*/
function checkInput(input, condition) {
  // user feedback
  input.onchange = (event) => {
    input.classList.remove("is-invalid")
    input.classList.remove("is-valid")
    if (condition.test(event.target.value.trim())) {
      input.classList.add("is-valid")
    } else {
      input.classList.add("is-invalid")
    }
  }
}
//check inputs validity
checkInput(document.querySelector("#firstName"), /^[a-zA-Z-,\s]+$/)
checkInput(document.querySelector("#lastName"), /^[a-zA-Z-,\s]+$/)
checkInput(document.querySelector("#adress"), /^([a-zA-Z0-9-\s]+){1,8}$/)
checkInput(document.querySelector("#city"), /^[a-zA-Z-,\s]+$/)
//source: https://emailregex.com/
checkInput(document.querySelector("#email"), /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
/*--------------------------------------------------------------------------------------*/

function getFormData() {
  const form = document.querySelector(".form")
  //if(formValidated){}
  form.onsubmit = (event) => {
    event.preventDefault()
    //getting field value
    const firstName = event.target.firstName.value.trim()
    const lastName = event.target.lastName.value.trim()
    const address = event.target.address.value.trim()
    const city = event.target.city.value.trim()
    const email = event.target.email.value.trim()
    //Creating contactObject
    let contactObject = { firstName: firstName, lastName: lastName, address: address, city: city, email: email }
    //Objet de contact
    console.log('Objet de Contact : ', contactObject)
    return contactObject
    //redirect to confirmation
    setTimeout(() => window.location.href = `./confirmation.html`, 2500)


  }
}

/*---------------------------------------- ORDER ----------------------------------------*/

function sendOrder() {
  const productArray = cart.cartToArray()
  const contactObject = getFormData()
  let order = { contactObject, productArray }

  return fetch(`${apiUrl}/api/cameras/order`, {
    method: "POST",
    body: JSON.stringify(contactObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));

}

