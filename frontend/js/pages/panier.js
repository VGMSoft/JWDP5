let cart = [];

(async() => {
    appendToCart()
        //const inputs = await getFormInputs();
        //sendOrder(inputs);
        //emptyCart()
})();



function appendToCart() {
    cart.push(localStorage.getItem('newItem'))
    localStorage.setItem('cart', cart)
    console.log(cart)
}












function getFormInputs() {
    document.querySelector(".order").onclick = (e) => {
        e.preventDefault();
        alert("Erreur 404");
        const name = document.querySelector("#name");
        const email = document.querySelector("#email");
    };
}


/*
function sendOrder(name, email) {
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
*/

/*orderData*/
let contact = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
};
let products = [];

let order = { contact, products };




/*CART*/
function quantityCalc() {}

function totalCalc() {}

/*FORM*/
function formValidate() {
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
}

/*------------------------------------------------------------*/
function emptyCart() {
    document.querySelector(".emptyCart").onclick = () => {
        localStorage.clear()
        console.warn("Cart cleaned")
    }
}