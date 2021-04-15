class Cart {
  //get localStorage content for 'cart' key
  getCartItems() {
    return JSON.parse(localStorage.getItem('cart')) || {}
  }

  //send products object to localStorage under 'cart' key
  setCartItem(cart) {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  emptyCart() {
    localStorage.clear()
    location.reload()
  }

  removeItem(product) {
    let cart = this.getCartItems()
    //delete product
    delete cart[product._id]
    //Append to localStorage
    this.setCartItem(cart)
    location.reload()
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
    //Append to localStorage
    this.setCartItem(cart)
  }

  /*------------------------------------ Cart Math ------------------------------------*/

  modifyQuantity(product, quantityInput) {
    // Update quantity
    this.updateQuantity(product._id, quantityInput.value)
    // Update total product price
    let totalPrice = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".totalPrice")
    let updatedTotal = (product.price.slice(0, -1) * this.getQuantity(product._id))
    totalPrice.innerHTML = `${updatedTotal}&#128;`
    // Update global total
    document.querySelector(".globalTotal").innerHTML = `${this.globalTotal()}&#128;`
    // Update product amount
    this.updateAmount()
    //deleting product if quantity less than 0
    if (event.target.parentElement.parentElement.querySelector(".quantity").value < 1) {
      this.removeItem(product)
      alert("Votre produit a été supprimé du panier.")
    }
  }

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

  // Showing amount of products in cart
  getAmount() {
    let cartContent = document.querySelector(".cartContent")
    if (localStorage.getItem('amount') == 0) {
      cartContent.classList.add("d-none")
      cartContent.classList.remove("d-inline-block")
    } else {
      cartContent.innerHTML = localStorage.getItem('amount')
      cartContent.classList.add("d-inline-block")
      cartContent.classList.remove("d-none")
    }
  }

  updateAmount() {
    const amountOfProduct = this.cartToArray().reduce((acu, product) => {
      return acu + (parseInt(product.quantity))
    }, 0)
    localStorage.setItem('amount', amountOfProduct)
  }

  showAmount() {
    this.updateAmount()
    this.getAmount()
  }

  // Total calculations
  totalProductPrice(product) {
    return parseInt(product.price) * parseInt(product.quantity)
  }
  globalTotal() {
    const globalTotal = this.cartToArray().reduce((acu, product) => {
      return acu + this.totalProductPrice(product)
    }, 0)
    if (globalTotal != 0) {
      document.querySelector(".cartIsEmpty").classList.replace("d-flex", "d-none")
    }
    return globalTotal
  }
}
//Cart class Instanciation
const cart = new Cart()