class Cart {


    // localStorage.setItem('cart', JSON.stringify(products))


    getOption(onOptionSelected) {
        const lenseSelector = document.querySelector(".lenseSelector")
        lenseSelector.onchange = () => {
            onOptionSelected(lenseSelector.value)
            return lenseSelector.value
        }
    }

    createProductObject(product){
        //new Product Object
        let productObject = {}
        //Adding attribute to cartObject
        productObject.name = product.name
        productObject.price = (product.price / 100 + "€")
        productObject.option = "option"
        productObject.quantity = 1
        cart[id] = productObject
    }



    addItem(product) {
        //Create cart
        const cart = JSON.parse(localStorage.getItem('cart')) || {}
        const id = (product._id)
        //test if product exist in cart
        if (cart[id] == null) {
            createProductObject(product)
        } else {
            //increasing quantity
            cart[id].quantity++
        }
        //Append to localStorage
        localStorage.setItem('cart', JSON.stringify(cart))
    }
    /*  removeItem(id) {
        localStorage.removeItem(id);
    }*/
}

const cart = new Cart()