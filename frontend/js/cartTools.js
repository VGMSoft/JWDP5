class Cart {

  //get localStorage content for 'cart' key
  getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || {}
  }

  //send products object to localStorage under 'cart' key
  setCartItem(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  //transform products object in products array
  cartToArray() {
    return Object.values(this.getCartItems())
  }

  /*------------------------------- build cart -----------------------------*/
  //get lense option on change
  getOption() {
    const lenseSelector = document.querySelector(".lenseSelector")
    if (lenseSelector.value !== "Lenses") {
      return lenseSelector.value
    }
  }

  //building cart object
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
  //User update quantity
  getQuantity(id) {
    const product = this.getCartItems()
    return product[id].quantity
  }
  updateQuantity(id, quantity) {
    const cart = this.getCartItems()
    cart[id].quantity = quantity
    this.setCartItem(cart)
  }

  //showing mount of products in cart
  getAmount() {
    let cartContent = document.querySelector(".cartContent")
    console.log(cartContent)
    if (localStorage.getItem('amount') == 0) {
      cartContent.classList.add("d-none")
      cartContent.classList.remove("d-inline-block")
    } else {
      cartContent.innerHTML = localStorage.getItem('amount')
      cartContent.classList.remove("d-none")
    }
  }

  updateAmount() {
    const amountOfProduct = this.cartToArray().reduce((acu, product) => {
      return acu + (parseInt(product.quantity))
    }, 0)
    localStorage.setItem('amount', amountOfProduct)
  }

  //total  
  TotalProductPrice(product) {
    return parseInt(product.price) * parseInt(product.quantity)
  }
  GlobalTotal() {
    const globalTotal = this.cartToArray().reduce((acu, product) => {
      return acu + (parseInt(product.price) * parseInt(product.quantity))
    }, 0)
    if (globalTotal != 0) {
      document.querySelector(".cartIsEmpty").classList.replace("d-flex", "d-none")
    }
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