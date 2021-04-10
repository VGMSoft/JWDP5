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
  console.log('Tableau de produits : ', cart.cartToArray())
  //Tableau de produits
  for (let i in productArray) {
    // get template
    const template = document.querySelector("#template");
    // clone template
    const clone = document.importNode(template.content, true)
    //fill template
    totalProductPrice = cart.calcTotalProductPrice(i)
    clone.querySelector(".productName").innerHTML = productArray[i].name
    clone.querySelector(".quantity").value = productArray[i].quantity
    clone.querySelector(".unityPrice").innerHTML = productArray[i].price
    clone.querySelector(".totalPrice").innerHTML = `${totalProductPrice}&#128;`
    clone.querySelector(".totalPrice").setAttribute("value", totalProductPrice)
    document.querySelector(".templateContainer").appendChild(clone);
  }
}
//global total
document.querySelector(".globalTotal").innerHTML = `${cart.calcGlobalTotal()}&#128;`

//if cart is Empty
if (cart.calcGlobalTotal() != 0) {
  document.querySelector(".cartIsEmpty").classList.replace("d-flex", "d-none")
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
  //getting field value
  const firstName = document.querySelector("#firstName").value.trim()
  const lastName = document.querySelector("#lastName").value.trim()
  const address = document.querySelector("#adress").value.trim()
  const city = document.querySelector("#city").value.trim()
  const email = document.querySelector("#email").value.trim()
  //Creating contactObject
  let contactObject = { firstName: firstName, lastName: lastName, address: address, city: city, email: email }
  //Objet de contact
  console.log('Objet de Contact : ', contactObject)
  return contactObject
}


/*---------------------------------------- ORDER ----------------------------------------*/
/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
function sendOrder() {

  const order = {
    contact: getFormData(),
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
      window.location.href = `./confirmation.html?orderId=${json.orderId}&total=${cart.calcGlobalTotal()}`
    })

  
}

document.querySelector(".form").onsubmit = (event) => {
  event.preventDefault()
  sendOrder()
}

