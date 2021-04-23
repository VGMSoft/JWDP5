class Cart {
  //get localStorage content for 'cart' key
  getCart() {
    return JSON.parse(localStorage.getItem('cart')) || {}
  }

  //send products object to localStorage under 'cart' key
  saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  emptyCart() {
    localStorage.clear()
  }

  removeItem(product) {
    let cart = this.getCart()
    //delete product
    delete cart[product._id]
    //Append to localStorage
    this.saveCart(cart)
  }

  //transform products object in products array
  getCartItems() {
    return Object.values(this.getCart())
  }

  /*------------------------------- build cart -----------------------------*/

  //building cart object
  addItem(product, option) {
    //Get cart content
    const cart = this.getCart()
    //test if product exist in cart
    if (cart[product._id] == null) {
      //setting new Product Object
      cart[product._id] = {}
      cart[product._id].option = []
      //Adding attribute to Product Object
      cart[product._id]._id = product._id
      cart[product._id].name = product.name
      cart[product._id].price = `${product.price / 100}€`
      cart[product._id].option.push(option)
      cart[product._id].quantity = 1
    } else {
      //increasing quantity
      cart[product._id].quantity++
      //add option
      cart[product._id].option.push(option)
    }
    //Append to localStorage
    this.saveCart(cart)
  }

  /*------------------------------------ Cart Math ------------------------------------*/

//Quantity
  itemUpdater(product, quantityInput) {
    // Update quantity
    this.updateQuantity(product._id, quantityInput.value)
    // Update amount of products in cart,
    this.updateAmount()
    //deleting product if quantity less than 0
    if (quantityInput.value < 1) {
      this.removeItem(product)
      alert("Votre produit va être supprimé du panier.")
    }
  }

  updateQuantity(id, quantity) {
    const cart = this.getCart()
    cart[id].quantity = quantity
    this.saveCart(cart)
  }

  // total amount of products in cart
  getAmount() {
   return JSON.parse(localStorage.getItem('amount'))
  }

  updateAmount() {
    const amountOfProduct = this.getCartItems().reduce((acu, product) => {
      return acu + (parseInt(product.quantity))
    }, 0)
    localStorage.setItem('amount', amountOfProduct)
  }
}
//Cart class Instanciation
const cart = new Cart()
