(() => {
  const itemsInCart = cart.getCartItems()
  displayCartProduct(itemsInCart)
  cart.calcGlobalTotal()
})()

/*---------------------------------------- CART ----------------------------------------*/
function cartObjectToProductArray() {
  return Object.values(cart.getCartItems())
}
//Display Cart Content
function displayCartProduct() {
  //Append Cart product Id in Product Array
  let productArray = cartObjectToProductArray()
  //Tableau de produits
  console.log('Tableau de produits : ', productArray)
  for (let i in productArray) {
    // get template
    const template = document.querySelector("#template");
    // clone template
    const clone = document.importNode(template.content, true)
    //fill template

    totalProductPrice = parseInt(productArray[i].price) * parseInt(productArray[i].quantity)
    clone.querySelector(".productName").innerHTML = productArray[i].name
    clone.querySelector(".quantity").value = productArray[i].quantity
    clone.querySelector(".unityPrice").innerHTML = productArray[i].price
    clone.querySelector(".totalPrice").innerHTML = `${totalProductPrice}€`
    clone.querySelector(".totalPrice").setAttribute("value", totalProductPrice)

    document.querySelector(".templateContainer").appendChild(clone);
  }
}
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
    if (condition(event)) {
      input.classList.remove("is-invalid")
      input.classList.add("is-valid")
      getFormData()
    } else {
      input.classList.remove("is-valid")
      input.classList.add("is-invalid")
    }
  }
  input.onblur = () => {
    input.classList.remove("is-valid")
  }
}



//? add looper or eventListener
//check inputs validity
checkInput(document.querySelector("#firstName"), (event) => {
  const textRegex = /^[a-zA-Z-,\s]+$/
  return textRegex.test(event.target.value.trim())
})
checkInput(document.querySelector("#lastName"), (event) => {
  const textRegex = /^[a-zA-Z-,\s]+$/
  return textRegex.test(event.target.value.trim())
})
checkInput(document.querySelector("#adress"), (event) => {
  const adressRegex = /^([a-zA-Z0-9-\s]+){1,8}$/
  return adressRegex.test(event.target.value.trim())
})
checkInput(document.querySelector("#city"), (event) => {
  const textRegex = /^[a-zA-Z-,\s]+$/
  return textRegex.test(event.target.value.trim())
})
checkInput(document.querySelector("#email"), (event) => {
  //source: https://emailregex.com/
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return emailRegex.test(event.target.value.trim())
})

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
    //redirect to confirmation
    setTimeout(() => window.location.href = `./confirmation.html`, 2500)
  }
}

/*---------------------------------------- ORDER ----------------------------------------*/
/* function sendOrder(contactObject, productArray) {
  return fetch(`${apiUrl}/api/cameras/order`, {
    method: "POST",
    body: JSON.stringify(contactObject),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
    let order = { contactObject: {}, productArray: [] }
} */

