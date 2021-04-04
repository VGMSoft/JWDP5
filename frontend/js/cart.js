class Cart {
  //
  getCartItems = () => JSON.parse(localStorage.getItem('cart')) || {}

  setCartItem = (cart) => localStorage.setItem('cart', JSON.stringify(cart))

  //Create Cart
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
      console.log("Lense Option :", lenseSelector.value)
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
      productObject.price = (product.price / 100 + "€")
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
    console.log("New Product :", cart[product._id])
    console.log("Cart Content :", cart)
    //Append to localStorage
    this.setCartItem(cart)
  }

  //Cart Math
  productTotal() { }



  totalCalc(productTotal) {
    const totalPrice = ""
  }

}

const cart = new Cart()