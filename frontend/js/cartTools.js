class Cart {
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
      cart[product._id]._id = product._id
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
//Quantity
  getQuantity(id) {
    const product = this.getCartItems()
    return product[id].quantity
  }
  updateQuantity(id, quantity) {
    const cart = this.getCartItems()
    cart[id].quantity = quantity
    this.setCartItem(cart)
  }

  //total  
  TotalProductPrice(product) {
    return parseInt(product.price) * parseInt(product.quantity)
  }
  GlobalTotal() {
    const globalTotal = this.cartToArray().reduce((acu, product) => {
      return acu + (parseInt(product.price) * parseInt(product.quantity))
    }, 0)
    return globalTotal
  }

  // Empty Cart
  emptyCart() {
    localStorage.clear()
    console.warn("Cart cleaned")
    location.reload()
  }
}
// Instanciation de la classe Cart
const cart = new Cart()