/*GET Request (_id, total)*/

/*POST Request (imageUrl, name, description, lenses[])*/
const myRequest = new Request(`${apiUrl}/api/cameras/order`);


/*totalCalc*/

/* verification formulaire*/

//firstName
//lastName
//address
//city
//email
const ValidateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test("myForm.emailAddr.value")) {
    return (true)
  }
  alert("You have entered an invalid email address!")
  return (false)
}


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

/*POST Request (#firstName, #lastName, #address, #city, #email)*/

fetch(myRequest, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ order })
})
  .then(res => {
    if (res.ok) {
      
      res.json().then(data => console.log(data));
    }
    else {
      throw new Error("Erreur de conexion à l'API");
    }
  })
  .catch(error => console.log(error));