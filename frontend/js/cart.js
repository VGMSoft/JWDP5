/* ------------------------------------------ Adding to Cart ------------------------------------------
(async() => {
    const option = await getLenseOption()
    createProductObject(product, option)
})()*/

/* ------------------------------------------- Building Cart -------------------------------------------- 
function getLenseOption() {
    const lenseSelector = document.querySelector(".lenseSelector")
    lenseSelector.onchange = () => {
        console.log(lenseSelector.value)
        return lenseSelector.value
    }
}

function createProductObject(product, option) {
    //gathering data
    const id = (product._id)
    const name = (product.name)
    const price = (product.price / 100 + "€")
    const lenseSelector = document.querySelector(".lenseSelector")
        //Create cart
    let cartContent = {}
        //Create cartObject
    const productObject = {}
        //Adding attribute to cartObject
    productObject.name = name
    productObject.price = price
    productObject.option = option
    productObject.quantity = 1
        //Append to localStorage
    console.log(productObject)
    localStorage.setItem('cartContent', JSON.stringify(productObject))
}
*/


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



}
/*------------------------------------------------------------------------------------------------*/

class CartObject {}

const cart = new CartObject()