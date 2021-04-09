class Cart {
  //
  getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || {}
  }

  setCartItem(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  cartToArray() {
    return Object.values(this.getCartItems())
  }


  /*------------------------------------ build------------------------------------*/
  getOption() {
    const lenseSelector = document.querySelector(".lenseSelector")
    if (lenseSelector.value !== "Lenses") {
      return lenseSelector.value
    }
  }

  addItem(product) {
    //Get cart content
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
  //total price for product 
  calcTotalProductPrice(i) {
    return parseInt(this.cartToArray()[i].price) * parseInt(this.cartToArray()[i].quantity)
  }

  //total price for product 
  calcGlobalTotal() {
    let totalArray = []
    for (let i in this.cartToArray()) {
      totalArray.push(parseInt(this.cartToArray()[i].price) * parseInt(this.cartToArray()[i].quantity))
    }
    return totalArray.reduce((accu, value) => accu + value)
  }
  /*-------------------------------- Cart Controls ----------------------------------*/


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
    location.reload()
  }

}

const cart = new Cart()