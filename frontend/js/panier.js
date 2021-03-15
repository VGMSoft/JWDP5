/*GET Request (_id, total)*/

/*POST Request (imageUrl, name, description, lenses[])*/
const myRequest = new Request("https://oc-p5-api.herokuapp.com/api/cameras");


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



/*POST Request (#firstName, #lastName, #address, #city, #email)*/

fetch(myRequest, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({/* contactObject */ }, {/* productArray */ })
})
  .then(res => {
    if (res.ok) {
      console.log("SUCCES");
      res.json().then(data => console.log(data));
    }
    else {
      console.log("!SUCCES");
      throw new Error("Erreur de conexion à l'API");
    }
  })
  .catch(error => console.log("!SUCCES"));