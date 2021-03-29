(async() => {


})();


/*---------------------------------------- CART ----------------------------------------*/
function productTotal(product) {
    let productTotal = product.price * product.quantity
}

function totalCalc(productTotal) {
    const totalPrice = ""
}

//show cart products
function showCartProducts() {
    /* get template */
    const template = document.querySelector("#template")
        /* clone template */
    const clone = document.importNode(template.content, true);
    /* send filled template */
    document.querySelector(".templateContainer").appendChild(clone);
}
for (let i = 0; i < 3; i++) {
    showCartProducts()
}


/*---------------------------------------- FORM ----------------------------------------*/
function formValidate(input, condition) {

}


//firstName
const ValidateFirstName = (firstName) => {
        if (/^([a-zA-Z ]+)$/) {
            return (true)
        }
        alert("Veuillez entrer votre prénom")
        return (false)
    }
    //lastName
const ValidateLastName = (lastName) => {
        if (/^([a-zA-Z ]+)$/) {
            return (true)
        }
        alert("Veuillez entrer votre nom de famille")
        return (false)
    }
    //address
const ValidateAddress = (address) => {
        if (/^([0-9]+\ )([a-zA-Z]+\ ?)([a-zA- Z] +\ )([a-zA-Z\ ]+)$/) {
            return (true)
        }
        alert("Veuillez entrer votre nom de famille")
        return (false)
    }
    //city
/^([a-zA-Z]+)$/;
//email
const ValidateEmail = (mail) => {
    if (/^$/.test(myForm.emailAddr.value)) {
        return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
}


/*---------------------------------------- ORDER ----------------------------------------*/
/*orderData*/

function sendOrder(firstName, lastName, address, city, email) {
    return fetch(`${apiUrl}/api/cameras/order`, {
            method: "POST",
            body: JSON.stringify({
                firstName: "",
                lastName: "",
                address: "",
                city: "",
                email: ""
            }, {

            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
        .then((response) => response.json())
        .then((json) => console.log(json));
}
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
};
let products = [];

let order = { contact, products };






/*---------------------------------------- onclick called func ----------------------------------------*/
function emptyCart() {
    localStorage.clear()
    console.warn("Cart cleaned")
}