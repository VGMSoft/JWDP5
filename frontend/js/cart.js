class Cart {
  //
  getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || {}
  }

  setCartItem(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }


  /*------------------------------------ build
 ------------------------------------*/
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
      //setting new Product Object
      cart[product._id] = {}
      cart[product._id].option = []
      //Adding attribute to Product Object
      cart[product._id].name = product.name
      cart[product._id].price = `${product.price / 100}€`
      cart[product._id].option.push(`${this.getOption()}`)
      cart[product._id].quantity = 1
    } else {
      //increasing quantity
      cart[product._id].quantity++
      //add option
      cart[product._id].option.push(`${this.getOption()}`)
    }
    //display results on console
    console.log('New Product : ', cart[product._id])
    console.log('Cart Content : ', cart)
    //Append to localStorage
    this.setCartItem(cart)
  }

  /*------------------------------------ Cart Math ------------------------------------*/

  /* 
  calcGlobalTotal() {
    let globalTotal = 0;

    // TODO a
    const totalProductPrice = Object.values(this.getCartItems())
    const globalTotalDisplay = document.querySelector(".globalTotal");
    Array.from(totalProductPrice).forEach((product) => {
      globalTotal += parseInt(product.getAttribute("value"))
    })
    globalTotalDisplay.innerHTML = `${globalTotal}€`
  } */

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