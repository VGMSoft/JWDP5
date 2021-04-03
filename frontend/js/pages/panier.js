(() => {
    for (let i = 0; i < 5; i++) {
        showCartProducts()
    }
    getFormData()
    //formValidate()
    //buildContactObject()
})();


/*---------------------------------------- CART ----------------------------------------*/
function getCartProducts() {
    console.log(JSON.parse(localStorage.getItem('cartContent')))
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


function productTotal(product) {
    let productTotal = product.price * product.quantity
}

function totalCalc(productTotal) {
    const totalPrice = ""
}

/*---------------------------------------- FORM ----------------------------------------*/



function getFormData() {
    const form = document.querySelector(".form")
    form.onsubmit = (e) => {
        e.preventDefault()
        //getting field value
        const firstName = e.target.firstName.value
        const lastName = e.target.lastName.value
        const address = e.target.address.value
        const city = e.target.city.value
        const email = e.target.email.value
        //Creating contactObject
        let contactObject = { firstName: firstName, lastName: lastName, address: address, city: city, email: email }
        console.log(contactObject)
    }
}

function formValidate(input, condition) {
    const lastName = document.querySelector('input[name=""]')
    lastName.onchange = () => {
        lastName.addEventListener('invalid', (e) => {
            lastName.style.border = "solid red 1px"

        });
    }
}

function buildContactObject() { }

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

// Empty Cart
function emptyCart() {
    localStorage.clear()
    console.warn("Cart cleaned")
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