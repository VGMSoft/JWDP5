(() => {
  cart.updateAmount()
  const itemsInCart = cart.getCartItems()
  displayProduct(itemsInCart)
})()

/*---------------------------------------- CART ----------------------------------------*/
//Display Cart Content
function displayProduct() {
  //insert each product of product arrays
  let productArray = cart.cartToArray()
  console.log('Tableau de produits : ', productArray)
  productArray.forEach((product) => fillTemplate(product))
}

// Insert Data in Markup
function fillTemplate(product) {
  // get template
  const template = document.querySelector("#template");
  // clone template
  const clone = document.importNode(template.content, true)
  //fill template
  totalProductPrice = cart.TotalProductPrice(product)
  clone.querySelector(".productName").innerHTML = product.name
  clone.querySelector(".quantity").value = product.quantity
  clone.querySelector(".unityPrice").innerHTML = product.price
  clone.querySelector(".totalPrice").innerHTML = `${cart.TotalProductPrice(product)}&#128;`
  document.querySelector(".globalTotal").innerHTML = `${cart.GlobalTotal()}&#128;`
  //Listen to user changes
  userChangeListener(clone, product)
  //append clone element to markup
  document.querySelector(".templateContainer").appendChild(clone);
}

// Quantity listener & total calculation ON USER CHANGE
function userChangeListener(clone, product) {
  let quantity = clone.querySelector(".quantity")
  quantity.onchange = (event) => {
    event.preventDefault()
    // Update quantity
    cart.updateQuantity(product._id, quantity.value)
    // Update total product price
    let totalPrice = event.target.parentElement.parentElement.lastElementChild
    let updatedTotal = (product.price.slice(0, -1) * cart.getQuantity(product._id))
    totalPrice.innerHTML = `${updatedTotal}&#128;`
    // Update global total
    document.querySelector(".globalTotal").innerHTML = `${cart.GlobalTotal()}&#128;`
    // Update product amount
    cart.updateAmount()
    //deleting product if quantity less than 0
    if (event.target.value < 1) {
      cart.removeItem(product)
    }
  }
}

/*---------------------------------------- FORM ----------------------------------------*/
//check inputs validity
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

//Browse & verify input values
checkInput(document.querySelector("#firstName"), /^[a-zA-Z-,\s]+$/)
checkInput(document.querySelector("#lastName"), /^[a-zA-Z-,\s]+$/)
checkInput(document.querySelector("#adress"), /^([a-zA-Z0-9-\s]+){1,8}$/)
checkInput(document.querySelector("#city"), /^[a-zA-Z-,\s]+$/)
//source: https://emailregex.com/
checkInput(document.querySelector("#email"), /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)


//Create contatct object
function buildContactObject() {
  //getting field value
  const firstName = document.querySelector("#firstName").value.trim()
  const lastName = document.querySelector("#lastName").value.trim()
  const adress = document.querySelector("#adress").value.trim()
  const city = document.querySelector("#city").value.trim()
  const email = document.querySelector("#email").value.trim()
  //Creating contactObject
  let contactObject = { firstName: firstName, lastName: lastName, adress: adress, city: city, email: email }
  localStorage.setItem(`${firstName} ${lastName}`, JSON.stringify(contactObject))
  console.log('Objet de Contact : ', contactObject)
  return contactObject
}

/*---------------------------------------- ORDER ----------------------------------------*/
function sendOrder() {
  const order = {
    contact: buildContactObject(),
    products: Object.keys(cart.getCartItems())
  }
  console.log('Request body: ', order)
  //Post Request
  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }
  fetch(`${apiUrl}/api/cameras/order`, fetchOptions)
    .then((response) => response.json())
    .then((json) => {
      console.log('Request result: ', json)
      //redirect to confirmation
      window.location.href = `./confirmation.html?orderId=${json.orderId}&total=${cart.GlobalTotal()}`
    })
}
//prevent empty cart order
document.querySelector(".form").onsubmit = (event) => {
  event.preventDefault()
  //At least 1 product in cart
  if (Object.keys(cart.getCartItems()).length != 0) {
    sendOrder()
  } else {
    alert("Votre panier est vide, ajouter un article pour passer commande")
  }
}