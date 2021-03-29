/* ------------------------------------------ Adding to Cart ------------------------------------------*/
(() => {
    //Adding product to cart 
    getProductData()
        .then((productData) => buildCart(productData))
})();



function getProductData() {
    //get productId
    const id = getProductId()
    console.log(id)
        //get lense option
    const lenseSelector = document.querySelector(".lenseSelector")
    const lenseOption = lenseSelector.options[lenseSelector.selectedIndex].value
    console.log(lenseOption)
        //get price 
    const product = getProduct(id)
    console.log(product)
}

function buildCart() {

    if (typeof newCart[id] == "undefined") {

    } else if (typeof newCart[id] != "undefined") {
        newCart[id].quantity++
    }

    /* ------------------------------------*/
    //Create cart
    let newCart
        //Create cartObject
    newCart[id] = {}
        //Adding attribute to cartObject
    newCart[id].name = product.name
    newCart[id].price = product.price
    newCart[id].option = product.option
    newCart[id].quantity = 1
        //Append to localStorage
    console.log(newCart)
    localStorage.setItem('cartContent', JSON.stringify(newCart))

    /* ------------ exemple ---------------*/

    const id = "5be9c4471c9d440000a730e8"
        //let newCart = {}

    newCart[id] = {}
    newCart[id].name = "ZoomH6"
    newCart[id].price = "350"
    newCart[id].option = "lense1"
    newCart[id].quantity = 1
        //newCart[id].quantity++
    console.log(newCart)

    /* ------------------------------------*/
}