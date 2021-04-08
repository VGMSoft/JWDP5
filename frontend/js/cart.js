class Cart {
  //
  getCartItems = () => JSON.parse(localStorage.getItem('cart')) || {}

  setCartItem = (cart) => localStorage.setItem('cart', JSON.stringify(cart))


  /*------------------------------------  ------------------------------------*/
  //Create Cart Promise
  /* getOption(onOptionSelected) {
    const lenseSelector = document.querySelector(".lenseSelector")
    lenseSelector.onchange = () => {
      onOptionSelected(lenseSelector.value)
      return lenseSelector.value
    }
  } */
  getOption() {
    const lenseSelector = document.querySelector(".lenseSelector")
    if (lenseSelector.value !== "Lenses") {
      console.log(`Lense Option : ${lenseSelector.value}`)
      return lenseSelector.value
    }
  }

  addItem(product) {
    //Get cart
    const cart = this.getCartItems()
    //test if product exist in cart
    if (cart[product._id] == null) {
      //new Product Object
      let productObject = {}
      //Adding attribute to cartObject
      productObject.name = product.name
      productObject.price = `${product.price / 100}€`
      productObject.option = this.getOption()
      productObject.quantity = 1
      cart[product._id] = productObject
    } else {
      //increasing quantity
      cart[product._id].quantity++
      //add option
      //productObject.option.push(this.getOption())
    }
    //display results on console
    console.log('New Product : ', cart[product._id])
    console.log('Cart Content : ', cart)
    //Append to localStorage
    this.setCartItem(cart)
  }

  /*------------------------------------ Cart Math ------------------------------------*/
  calcGlobalTotal() {
    let globalTotal = 0;
    const totalProductPrice = document.querySelectorAll(".totalPrice");
    const globalTotalDisplay = document.querySelector(".globalTotal");
    Array.from(totalProductPrice).forEach((product) => {
      globalTotal += parseInt(product.getAttribute("value"))
    })
    globalTotalDisplay.innerHTML = `${globalTotal}€`
  }

  /*-------------------------------- Cart Controls ----------------------------------*/

  //? stopPropagation()
  //reduce quantity
  reduceQuantity(productId) {
    let cart = getCartItem()
    return cart[productId].quantity--
  }

  //increase quantity
  increaseQuantity(productId) {
    let cart = getCartItem()
    return cart[productId].quantity++
  }

  // Empty Cart
  emptyCart() {
    localStorage.clear()
    console.warn("Cart cleaned")
  }

}

const cart = new Cart()


/*-------------------------------- Events Listener ----------------------------------*/
//Lense Option Change Catcher
document.querySelector(".lenseSelector").onchange = (event) => {
  cart.getOption()
}

//Add Product To Cart
document.querySelector(".addToCart").onclick = (event) => {
  cart.addItem(product)
}

//Reveal Modal
document.querySelector(".revealModal").onclick = (event) => {
  revealModalOnClick(product)
}

//Empty Cart
document.querySelector(".emptyCart").onclick = (event) => {
  cart.emptyCart()
}

//Submit Form & Order
document.querySelector(".order").onclick = (event) => {
  sendOrder(contactObject, productArray)
}

//Submit Form & Order
document.querySelector(".form").onclick = (event) => {
  checkInput(input, condition)
}